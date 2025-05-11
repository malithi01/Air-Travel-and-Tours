// import React from "react";
// import { useNavigate } from "react-router-dom";
// import GoogleButton from 'react-google-button';
// import "../stylesheets/LoginPage.css";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   // Redirect to backend OAuth route
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:8000/auth/google";
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login to Air Travel & Tours</h2>
//         <p>Please sign in to access your travel plans</p>
        
//         <div className="login-methods">
//           <GoogleButton
//             onClick={handleGoogleLogin}
//             label="Sign in with Google"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from 'react-google-button';
import "../stylesheets/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect to backend OAuth route
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    setTimeout(() => {
      // Mock authentication logic
      if (email && password) {
        // Successful login - redirect to dashboard
        navigate("/dashboard");
      } else {
        // Failed login
        setErrorMessage("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to Air Travel & Tours</h2>
        <p>Sign in to access your travel plans and exclusive deals</p>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <div className="login-methods">
          <GoogleButton
            onClick={handleGoogleLogin}
            label="Sign in with Google"
          />
        </div>
        
        <div className="register-prompt">
          <p>Don't have an account? <Link to="/register" className="register-link">Register now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;