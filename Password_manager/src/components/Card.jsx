import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css'; // Add styles if needed

const Card = ({ title, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Add navigation for all card titles
    if (title === "Generate Password") {
      navigate('/password-generator');
    } else if (title === "Stored Password") {
      navigate('/stored-password'); // Navigate to Stored Password page
    } else if (title === "Add Password") {
      navigate('/add-password'); // Navigate to Add Password page
    } else if (title === "Stored Card Details") {
      navigate('/stored-card-details'); // Navigate to Stored Card Details page
    } else if (title === "Add Card Details") {
      navigate('/add-card-details'); // Navigate to Add Card Details page
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={title} className="card-image" />
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
