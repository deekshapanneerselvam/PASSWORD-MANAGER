import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        navigate('/phone-verification'); 
      } else {
        alert('Please verify your email before logging in.');
      }
    } catch (error) {
      setError('Login failed. Please check your email and password.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset the password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset email sent. Check your inbox.');
      setError('');
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="unique-form-container">
      <h2>Login</h2>
      {error && <p className="unique-error-message">{error}</p>}
      {resetMessage && <p className="unique-success-message">{resetMessage}</p>}
      <form onSubmit={handleSubmit} className="unique-form">
        <div className="unique-form-group">
          <label className="unique-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="unique-input"
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="unique-input"
          />
        </div>
        <button className="unique-button" type="submit">Login</button>
      </form>
      <p className="unique-forgot-password">
        <button type="button" className="unique-link-button" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </p>
    </div>
  );
};

export default Login;
