import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file

const LoginPage = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    // Check if email and password are non-empty
    if (email.trim() === '' || password.trim() === '') {
      console.error('Email and password cannot be empty!');
      return;
    }

    try {
      // Perform login logic here (replace 'http://localhost:8080' with your backend URL)
      const response = await fetch('http://localhost:8080/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Log the response status and data
      console.log('Response status:', response.status);

      // Parse the response data assuming it's in JSON format
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        // Handle authentication failure
        console.error('Authentication failed');
        setSuccess('False');
        return;
      }

      // Store the user ID in local storage
      localStorage.setItem('userId', responseData.userId);

      // Log the user ID from the successful login
      console.log('User ID:', responseData.userId);

      // Redirect to the '/app' route on successful login
      navigate('/app');
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Error during login:', error);
      // You might want to show a different error message or handle it in another way
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login Page</h1>

      <div className="login-box">
        <form className="login-form" onSubmit={handleLogin}>
          <label className="input-label">
            Email:
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </label>
          <label className="input-label">
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </label>

          {success && <p className="alert">Invalid login</p>}

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
      </div>

      <p className="signup-link">
        Don't have an account?{' '}
        <Link to="/signup" className="signup-link-text">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
