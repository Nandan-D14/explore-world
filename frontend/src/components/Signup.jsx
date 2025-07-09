import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '../styles/signup.css';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const { signup, loading, error } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters long");
        }
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push("Password must contain at least one lowercase letter");
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        if (!/(?=.*[0-9])/.test(password)) {
            errors.push("Password must contain at least one number");
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            errors.push("Password must contain at least one special character (!@#$%^&*)");
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous validation errors
        setValidationErrors([]);
        
        // Validate password
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            setValidationErrors(passwordErrors);
            return;
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setValidationErrors(["Passwords do not match"]);
            return;
        }
        
        const result = await signup({ username, email, password });
        if (result.success) {
            navigate("/profile");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                {/* Display validation errors */}
                {validationErrors.length > 0 && (
                    <div className="error-list">
                        {validationErrors.map((error, index) => (
                            <p key={index} className="error">{error}</p>
                        ))}
                    </div>
                )}
                
                {/* Display server error */}
                {error && <p className="error">{error}</p>}
                
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                    minLength={3}
                    maxLength={30}
                    pattern="[a-zA-Z0-9]+"
                    title="Username must contain only letters and numbers"
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                />
                
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                />
                
                <div className="password-requirements">
                    <small>Password requirements:</small>
                    <ul>
                        <li>At least 6 characters</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one number</li>
                        <li>At least one special character (!@#$%^&*)</li>
                    </ul>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Signup'}
                </button>

            </form>
            <p>Do you have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Signup;
