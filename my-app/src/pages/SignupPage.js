import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import your CSS file
 
const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Change variable name from 'username' to 'email'
  const [password, setPassword] = useState('');
 
  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
 
    // Check if any of the fields are empty
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      // You can add your own error handling or feedback here
      console.error('All fields must be filled out!');
      return;
    }
 
    // Log the data before sending it to the server
    console.log('Signup data:', {
      name: name,
      email: email, // Change variable name from 'username' to 'email'
      password: password,
    });
 
    try {
      // Perform signup logic using fetch (replace 'http://localhost:8080' with your backend URL)
      const response = await fetch('http://localhost:8080/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email, // Change variable name from 'username' to 'email'
          password: password,
        }),
      });
 
      if (!response.ok) {
        // Handle registration failure
        console.error('Registration failed');
        // You might want to show a different error message or handle it in another way
        return;
      }
 
      // Registration successful, redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle other errors (e.g., network issues)
      // You might want to show a different error message or handle it in another way
    }
  };
 
  return (
    <div className="signup-container">
      <h1 className="signup-heading">Signup Page</h1>
 
      <div className="signup-box">
        <form className="signup-form" onSubmit={handleSignup}>
          <label className="input-label">
            Name:
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-input"
              required
            />
          </label>
          <label className="input-label">
            Email: {/* Change label text from 'Username' to 'Email' */}
            <input
              type="email" // Use type="email" for email validation
              placeholder="Enter your email"
              value={email} // Change variable name from 'username' to 'email'
              onChange={(e) => setEmail(e.target.value)} // Change function argument from 'setUsername' to 'setEmail'
              className="signup-input"
              required
            />
          </label>
          <label className="input-label">
            Password:
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />
          </label>
          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
      </div>
 
      <p className="login-link">
        Already have an account? <Link to="/" className="login-link-text">Log in</Link>
      </p>
    </div>
  );
};
 
export default SignupPage;