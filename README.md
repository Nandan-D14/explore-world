# 🌍 Tourist Project - Enhanced Travel Discovery Platform

A modern, full-stack web application for discovering and exploring amazing travel destinations around the world. Built with React.js frontend and Node.js/Express backend with MongoDB database.

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Secure JWT-based authentication with refresh tokens
- **Destination Discovery**: Browse curated travel destinations by categories
- **Advanced Search**: Search and filter destinations by genre, country, rating
- **User Favorites**: Save and manage favorite destinations
- **Reviews & Ratings**: Rate and review destinations
- **Responsive Design**: Mobile-first, responsive design for all devices

### 🚀 Enhanced Features
- **Lazy Loading**: Optimized component loading for better performance
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Beautiful loading spinners and states
- **Form Validation**: Client-side and server-side validation
- **Security**: Helmet.js for security headers, rate limiting, CORS protection
- **API Management**: Centralized API handling with interceptors

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client with interceptors
- **Context API**: State management for authentication
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **React Hook Form**: Form handling with validation

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Joi**: Data validation
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger

## 📁 Project Structure

```
Tourist-Project/
├── Backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── .env.example          # Environment variables template
│   └── models/               # Database models (future)
├── frontend/
│   ├── public/               # Public assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Home2.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/         # React Context
│   │   │   └── AuthContext.js
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js
│   │   ├── styles/          # CSS files
│   │   └── App.js           # Main App component
│   └── package.json         # Frontend dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Tourist-Project
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   
   # Copy environment variables
   cp .env.example .env
   # Edit .env with your configuration
   
   # Start the server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start the development server
   npm start
   ```

4. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file
   - The application will create collections automatically

### Environment Variables

Create a `.env` file in the Backend directory:

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tourist_project
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRE=7d
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📊 API Documentation

### Authentication Endpoints

#### POST /signup
Register a new user
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST /login
Authenticate user
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### GET /profile
Get user profile (requires authentication)

### Places Endpoints

#### GET /places
Get all places

#### GET /countries
Get all countries

#### POST /favorites
Add place to favorites (requires authentication)

#### POST /create
Add new country (requires authentication)

## 🎨 UI/UX Enhancements

### Design Improvements
- **Modern UI**: Clean, modern interface with consistent design language
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Loading States**: Beautiful loading spinners for better user experience
- **Error Handling**: User-friendly error messages and recovery options
- **Form Validation**: Real-time form validation with helpful error messages

### Performance Optimizations
- **Lazy Loading**: Components are loaded on-demand
- **API Optimization**: Centralized API management with caching
- **Code Splitting**: Automatic code splitting for better loading times
- **Image Optimization**: Optimized image loading and display

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Rate Limiting**: Prevents abuse and brute force attacks
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Both client and server-side validation
- **Security Headers**: Helmet.js for security headers

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests (when implemented)
cd Backend
npm test
```

## 📦 Production Deployment

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Production
```bash
cd Backend
npm start
```

### Environment Configuration
- Set `NODE_ENV=production`
- Configure production database
- Set secure JWT secrets
- Configure CORS for production domains

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB for the flexible database solution
- All contributors and developers who made this project possible

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Traveling! 🌟**
