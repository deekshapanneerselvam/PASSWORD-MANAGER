import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import the Firestore db
import MainNavbar from './MainNavbar'; // Import the MainNavbar component
import './StoredCardDetails.css'; // Updated styles file

const StoredCardDetails = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the current user
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchCardDetails = async () => {
        try {
          // Get a reference to the 'storedcard' subcollection for the current user
          const q = query(collection(db, 'users', user.uid, 'storedcard'));
  
          // Fetch the documents
          const querySnapshot = await getDocs(q);
  
          // Extract the card details from the query snapshot
          const cards = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          // Set the card details state
          setCardDetails(cards);
        } catch (err) {
          setError('Error fetching card details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCardDetails();
    }
  }, [user]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div>
      <MainNavbar /> {/* Add the MainNavbar component here */}
      <div className="card-details-container">
        <h2>Your Stored Cards</h2>
        {cardDetails.length === 0 ? (
          <p>No stored card details found</p>
        ) : (
          <div className="card-details-list">
            {cardDetails.map((card) => (
              <div key={card.id} className="card-details-item">
                <h3>{card.cardholderName}</h3>
                <p>Card Number: {card.cardNumber}</p>
                <p>Expiring Date: {card.expiringDate}</p> {/* Display Expiry Date here */}
                <p>CVV: {card.cvv}</p>
                <p>Security Code: {card.securityCode}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}  

export default StoredCardDetails;
