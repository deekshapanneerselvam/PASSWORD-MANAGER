import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import { db, auth } from "../firebaseConfig"; // Import the auth module
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import CryptoJS from 'crypto-js'; // Import CryptoJS for AES encryption

const AddPassword = () => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const [logoUrl, setLogoUrl] = useState('');
  const navigate = useNavigate();

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    let strength = '';
    if (password.length < 6) {
      strength = 'Weak';
    } else if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength = 'Strong';
    } else if (/[A-Za-z]/.test(password) && /\d/.test(password)) {
      strength = 'Moderate';
    } else {
      strength = 'Weak';
    }
    setPasswordStrength(strength);
  };

  // Function to encrypt the password
  const encryptPassword = (password, secretKey) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const secretKey = 'yourSecretKey'; // Replace with your actual secret key

      // Encrypt the password before storing it
      const encryptedPassword = encryptPassword(password, secretKey);

      // Get the current user ID
      const userId = auth.currentUser.uid;

      // Reference to the user's storedPasswords subcollection
      const storedPasswordsRef = collection(db, 'users', userId, 'storedPasswords');

      // Add a new document to the user's "storedPasswords" collection in Firestore
      await addDoc(storedPasswordsRef, {
        website,
        username,
        password: encryptedPassword, // Use the encrypted password
        logoUrl,
        createdAt: new Date(),
      });

      // Clear the form
      setWebsite('');
      setUsername('');
      setPassword('');
      setLogoUrl('');

      // Navigate to the stored password page
      navigate('/stored-password');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <MainNavbar />
      <div className="form-container">
        <h2>Add Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Website:</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value); // Call password strength checker
              }}
              required
            />
            {/* Display password strength feedback */}
            {password && <p>Password Strength: {passwordStrength}</p>}
          </div>
          <div>
            <label>Logo URL:</label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Password</button>
        </form>
      </div>
    </div>
  );
};

export default AddPassword;
