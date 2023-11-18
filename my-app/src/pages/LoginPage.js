import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file
 
const LoginPage = () => {
  const navigate = useNavigate();
  const [success,setSuccess] = useState('');
  const [email, setEmail] = useState(''); // Change variable name from 'username' to 'email'
  const [password, setPassword] = useState('');
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
 
    // Check if both email and password are non-empty
    if (email.trim() === '' || password.trim() === '') {
      // You can add your own error handling or feedback here
      console.error('Email and password cannot be empty!');
      return;
    }
    // Log the data before sending it to the server
    console.log('Login data:', {
      email: email, // Change variable name from 'username' to 'email'
      password: password,
    });
 
    try {
      console.log(email, password)
 
      // Perform login logic here (replace 'http://localhost:8080' with your backend URL)
      const response = await fetch('http://localhost:8080/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Change variable name from 'username' to 'email'
          password: password,
        })
       
       
      }
     
     
      );
      console.log("response  is ", response)
      if (!response.ok) {
        // Handle authentication failure
        console.error('Authentication failed');
        setSuccess("False")
        // You might want to show a different error message or handle it in another way
        return;
      }
 
      // Authentication successful, redirect to /app
      navigate('/app');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle other errors (e.g., network issues)
      // You might want to show a different error message or handle it in another way
    }
  };
 
  return (
    <div className="login-container">
      <h1 className="login-heading">Login Page</h1>
 
      <div className="login-box">
        <form className="login-form" onSubmit={handleLogin}>
          <label className="input-label">
            Email: {/* Change label text from 'Username' to 'Email' */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email} // Change variable name from 'username' to 'email'
              onChange={(e) => setEmail(e.target.value)} // Change function argument from 'setUsername' to 'setEmail'
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
 
          {success && <p className='alert'>Invalid login</p>}
 
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
      </div>
 
      <p className="signup-link">
        Don't have an account? <Link to="/signup" className="signup-link-text">Sign up</Link>
      </p>
    </div>
  );
};
 
export default LoginPage;