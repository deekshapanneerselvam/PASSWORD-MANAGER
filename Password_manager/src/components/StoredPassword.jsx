import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Import the auth module
import MainNavbar from './MainNavbar';
import './StoredPassword.css';
import CryptoJS from 'crypto-js'; // Import CryptoJS for AES decryption

const StoredPassword = () => {
  const [storedPasswords, setStoredPasswords] = useState([]);
  const secretKey = 'yourSecretKey'; // Use the same secret key for decryption

  useEffect(() => {
    const fetchStoredPasswords = async () => {
      const userId = auth.currentUser.uid; // Get the user ID from authentication
      const passwordsCollection = collection(db, 'users', userId, 'storedPasswords'); // Reference to the user's storedPasswords subcollection

      const passwordSnapshot = await getDocs(passwordsCollection);
      const passwordsList = passwordSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          website: data.website,
          username: data.username,
          password: decryptPassword(data.password, secretKey), // Decrypt the password here
          logoUrl: data.logoUrl
        };
      });
      setStoredPasswords(passwordsList);
    };

    fetchStoredPasswords();
  }, []);

  // Function to decrypt the password
  const decryptPassword = (encryptedPassword, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to UTF-8 string
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  const handleDelete = async (id) => {
    const userId = auth.currentUser.uid; // Get the user ID from authentication
    await deleteDoc(doc(db, 'users', userId, 'storedPasswords', id)); // Delete from the user's storedPasswords subcollection
    const newStoredPasswords = storedPasswords.filter(password => password.id !== id);
    setStoredPasswords(newStoredPasswords);
  };

  const handleEdit = async (id) => {
    const passwordToEdit = storedPasswords.find(password => password.id === id);
    const website = prompt("Edit Website:", passwordToEdit.website);
    const username = prompt("Edit Username:", passwordToEdit.username);
    const password = prompt("Edit Password:", passwordToEdit.password);
    const logoUrl = prompt("Edit Logo URL:", passwordToEdit.logoUrl);
  
    if (website && username && password && logoUrl) {
      const userId = auth.currentUser.uid; // Get the user ID from authentication
      const passwordRef = doc(db, 'users', userId, 'storedPasswords', id);
      const encryptedPassword = encryptPassword(password, secretKey); // Encrypt the updated password
      await setDoc(passwordRef, { website, username, password: encryptedPassword, logoUrl }); // Update the document
      const updatedPasswords = storedPasswords.map(password => 
        password.id === id ? { id, website, username, password: encryptedPassword, logoUrl } : password
      );
      setStoredPasswords(updatedPasswords);
    }
  };

  // Function to encrypt the password
  const encryptPassword = (password, secretKey) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  return (
    <div className="stored-password-container">
      <MainNavbar />
      <h2>Stored Passwords</h2>
      <div className="password-card-container">
        {storedPasswords.length > 0 ? (
          storedPasswords.map((item) => (
            <div key={item.id} className="password-card">
              <img src={item.logoUrl} alt="Logo" className="app-logo" />
              <div className="password-info">
                <h3>{item.website}</h3>
                <p className="password-text">{item.password}</p>
              </div>
              <div className="button-container">
                <button className="action-button" onClick={() => handleCopy(item.password)}>Copy</button>
                <button className="action-button" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="action-button" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No passwords stored.</p>
        )}
      </div>
    </div>
  );
};


export default StoredPassword;
