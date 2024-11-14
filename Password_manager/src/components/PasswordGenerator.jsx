import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import './PasswordGenerator.css';
import { db, auth } from '../firebaseConfig'; // Import Firestore and Auth instance
import { addDoc, collection } from 'firebase/firestore';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  
  const navigate = useNavigate();

  // Function to generate password
  const generatePassword = async () => {
    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+[]{}|;:,.<>?';
    
    if (!characters) {
      alert('Please select at least one character type.');
      return;
    }

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedPassword(password);

    // Add password to Firestore in the user's subcollection
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Please log in to store the password.');
        return;
      }

      // Get the subcollection 'generated_passwords' of the logged-in user
      const generatedPasswordsRef = collection(db, 'users', user.uid, 'generated_passwords');

      // Add password data to the subcollection
      await addDoc(generatedPasswordsRef, {
        password: password,
        includeUppercase: includeUppercase,
        includeLowercase: includeLowercase,
        includeNumbers: includeNumbers,
        includeSymbols: includeSymbols,
        passwordLength: passwordLength, // Store the password length if needed
        createdAt: new Date() // Store the timestamp of password creation
      });

      console.log("Password saved to Firestore:", password);
    } catch (error) {
      console.error("Error saving password to Firestore:", error);
    }
  };

  // Function to copy the generated password to clipboard
  const copyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword).then(() => {
        alert("Password copied to clipboard!");
      }).catch((err) => {
        console.error("Error copying password:", err);
      });
    }
  };

  return (
    <div className="password-generator-container">
      <MainNavbar />
      <h2 className="generator-title">Password Generator</h2>
      <div className="generator-options">
        <label>Password Length:</label>
        <input
          type="number"
          min="4"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
        
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Include Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Include Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Include Symbols
          </label>
        </div>
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      <div className="generated-password">
        <label>Generated Password:</label>
        <input type="text" value={generatedPassword} readOnly />
        <button onClick={copyToClipboard} className="copy-button">Copy to Clipboard</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;

