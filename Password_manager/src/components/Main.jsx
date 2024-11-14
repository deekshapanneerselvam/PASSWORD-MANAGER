import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import MainNavbar from './MainNavbar';
import './Main.css';
import generatePasswordImage from '../assets/password-generator.png';
import storedPasswordImage from '../assets/stored-password.png';
import addPasswordImage from '../assets/add-password.jpg';
import storedCardDetailsImage from '../assets/stored-card-details.jpg';
import addCardDetailsImage from '../assets/add-card-details.jpg';

const Main = () => {
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    if (title === "Generate Password") {
      navigate('/password-generator');
    } else if (title === "Stored Password") {
      navigate('/stored-password');
    } else if (title === "Add Password") {
      navigate('/add-password');
    } else if (title === "Stored Card Details") {
      navigate('/stored-card-details'); // This should navigate to the StoredCardDetails component
    } else if (title === "Add Card Details") {
      navigate('/add-card-details'); // This should navigate to the AddCardDetails component
    }
  };

  const cardDetails = [
    {
      title: "Generate Password",
      image: generatePasswordImage
    },
    {
      title: "Stored Password",
      image: storedPasswordImage
    },
    {
      title: "Add Password",
      image: addPasswordImage
    },
    {
      title: "Stored Card Details",
      image: storedCardDetailsImage
    },
    {
      title: "Add Card Details",
      image: addCardDetailsImage
    }
  ];

  return (
    <div className="main-container">
      <MainNavbar />
      <h1 className="main-heading">WELCOME TO KEEPER OF KEYS</h1>
      <div className="card-container">
        {cardDetails.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            image={card.image}
            onClick={() => handleCardClick(card.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;

