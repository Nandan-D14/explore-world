const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow all vercel.app domains and localhost for development
    if (origin.includes('vercel.app') || origin.includes('localhost')) {
      console.log('CORS allowing origin:', origin);
      return callback(null, true);
    }
    
    // Additional specific domains if needed
    const allowedOrigins = [
      'https://explpore-world.vercel.app',
      'https://tourist-project-frontend.vercel.app',
      'https://explore-world-frontend.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (allowedOrigins.includes(origin)) {
      console.log('CORS allowing specific origin:', origin);
      return callback(null, true);
    }
    
    console.log('CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Accept', 'Origin', 'X-Requested-With'],
  preflightContinue: false
};
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tourist_project", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  connectDB();
}

// Enhanced Schemas with validation and timestamps
const myfavSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  placeName: { type: String, required: true, trim: true },
  genuse: { type: String, required: true, trim: true },
  image1: { type: String, required: true },
  countryName: { type: String, required: true, trim: true },
  stateName: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  notes: { type: String, maxlength: 500 }
}, {
  timestamps: true
});

const CountrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  code: { type: String, required: true, unique: true, uppercase: true, maxlength: 3 },
  continent: { type: String, trim: true },
  currency: { type: String, trim: true },
  language: { type: String, trim: true },
  description: { type: String, maxlength: 1000 }
}, {
  timestamps: true
});

const PlaceSchema = new mongoose.Schema({
  countryName: { type: String, required: true, trim: true },
  states: [{
    stateName: { type: String, required: true, trim: true },
    places: [{
      placeName: { type: String, required: true, trim: true },
      address: { type: String, trim: true },
      description: { type: String, maxlength: 5000 },
      about: { type: String, maxlength: 5000 },
      genuse: { type: String, required: true, trim: true },
      image1: String,
      image2: String,
      image3: String,
      image4: String,
      image5: String,
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
      },
      rating: { type: Number, min: 0, max: 5, default: 0 },
      reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, maxlength: 500 },
        createdAt: { type: Date, default: Date.now }
      }],
      visitCount: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true }
    }]
  }]
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  firstName: { type: String, trim: true, maxlength: 50 },
  lastName: { type: String, trim: true, maxlength: 50 },
  profilePicture: { type: String },
  dateOfBirth: { type: Date },
  phoneNumber: { type: String, trim: true },
  preferences: {
    favoriteGenres: [String],
    travelStyle: { type: String, enum: ['budget', 'luxury', 'adventure', 'cultural', 'relaxation'] },
    notifications: { type: Boolean, default: true }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
const Myfav = mongoose.model("Myfav", myfavSchema);
const Country = mongoose.model("Country", CountrySchema);
const Places = mongoose.model("Places", PlaceSchema);

const JWT_SECRET = process.env.JWT_SECRET || "PES2UG23CS363";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "REFRESH_SECRET";

// Validation schemas
const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase, one uppercase, one number and one special character'
    }),
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  phoneNumber: Joi.string().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Helper function to generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRE || "24h" 
  });
  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { 
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d" 
  });
  return { accessToken, refreshToken };
};

// Enhanced signup route
app.post("/signup", async (req, res) => {
  try {
    // Validate request body
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map(detail => detail.message)
      });
    }

    const { username, email, password, firstName, lastName, phoneNumber } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: existingUser.email === email ? "Email already registered" : "Username already taken"
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber
    });
    
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Enhanced login route
app.post("/login", async (req, res) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map(detail => detail.message)
      });
    }

    const { email, password } = value;

    // Find user and include password for verification
    const user = await User.findOne({ email, isActive: true }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
};

app.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("Error fetching profile");
  }
});

app.post("/create", async (request, response) => {
  try {
    const { Name, Code } = request.body;
    const country = new Country({ Name, Code });
    await country.save();
    response.status(201).send("Country added successfully");
  } catch (error) {
    response.status(500).send("Error adding country");
  }
});

app.post("/favorites", authenticate, async (request, response) => {
  try {
    const { placeName, genuse, image1, countryName, stateName } = request.body;

    const existingPlace = await Myfav.findOne({ placeName, userId: request.user.id });
    if (existingPlace) {
      return response.status(400).send("Place already exists in favorites.");
    }

    const myfav = new Myfav({
      userId: request.user.id,
      placeName,
      genuse,
      image1,
      countryName,
      stateName,
    });
    await myfav.save();
    response.status(201).send("Favorite added successfully");
  } catch (error) {
    console.error("Error adding favorite:", error);
    response.status(500).send("Error adding favorite");
  }
});


app.get("/countries", async (request, response) => {
  try {
    const countries = await Country.find();
    response.status(200).send(countries);
  } catch (error) {
    response.status(500).send("Error fetching countries");
  }
});

app.get("/places", async (req, res) => {
  try {
    const places = await Places.find();
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching places");
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tourist Project Backend API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS error: Origin not allowed',
      origin: req.headers.origin
    });
  }
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;


