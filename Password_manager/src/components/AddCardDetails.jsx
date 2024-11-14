import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from './MainNavbar'; // Import MainNavbar
import { db, auth } from '../firebaseConfig'; // Import Firebase configuration
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './AddCardDetails.css';

const AddCardDetails = () => {
  const navigate = useNavigate();

  // State for storing the form input values
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiringDate, setExpiringDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!cardholderName || !cardNumber || !expiringDate || !cvv || !securityCode) {
      setError('Please fill out all fields.');
      return;
    }
  
    try {
      const user = auth.currentUser;
      if (user) {
        // Reference to the `storedcard` subcollection under the current user
        const cardRef = collection(db, 'users', user.uid, 'storedcard');
        
        // Add the new card details to the Firestore database
        await addDoc(cardRef, {
          cardholderName,
          cardNumber,
          expiringDate,  // Ensure this is the exact field you want
          cvv,
          securityCode,
          timestamp: serverTimestamp(), // Timestamp for when the card was added
        });
  
        // After saving, redirect to the Stored Card Details page (or another page of your choice)
        navigate('/stored-card-details');
      } else {
        setError('No user logged in.');
      }
    } catch (error) {
      setError('Failed to save card details. Please try again.');
    }
  };
  

  return (
    <div>
      <MainNavbar /> {/* Include the MainNavbar here */}
      <div className="add-card-details-container">
        <h1>Add Card Details</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="card-details-form">
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Enter cardholder's name"
              required
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number"
              required
            />
          </div>

          <div className="form-group">
            <label>Expiring Date</label>
            <input
              type="text"
              value={expiringDate}
              onChange={(e) => setExpiringDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="Enter CVV"
              required
            />
          </div>

          <div className="form-group">
            <label>Security Code</label>
            <input
              type="text"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="Enter security code"
              required
            />
          </div>

          <button type="submit">Save Card Details</button>
        </form>
      </div>
    </div>
  );
};

export default AddCardDetails;
