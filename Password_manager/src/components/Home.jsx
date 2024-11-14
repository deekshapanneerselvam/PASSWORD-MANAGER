import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css'; 
import heroImage from '../assets/keeper-of-keys.png'; 
import featureImage1 from '../assets/password-generator.png'; 
import featureImage2 from '../assets/add-password.jpg';
import featureImage3 from '../assets/stored-password.png';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <img src={heroImage} alt="Keeper of Keys" className="hero-image" />
        <div className="hero-text">
          <h2>Welcome to Keeper of Keys</h2>
          <p>
            Securely store and manage your passwords with ease. Our robust features ensure the safety and accessibility of your sensitive data.
          </p>
          <Link to="/signup">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
      </div>

      <div className="key-features-section">
        <h2 className="key-features-heading">Features</h2>


        <div className="features-section">
          <div className="feature-card">
            <div className="feature-image-container">
              <img src={featureImage1} alt="Password Generator" className="feature-image" />
            </div>
            <div className="feature-text">
              <h3>Password Generator</h3>
              <p>Generate strong, secure passwords with ease. Customize the length and complexity to suit your needs. Protect your accounts with unique, hard-to-crack passwords.</p>
            </div>
          </div>

          <div className="feature-card reverse">
            <div className="feature-image-container">
              <img src={featureImage2} alt="Add Password" className="feature-image" />
            </div>
            <div className="feature-text">
              <h3>Add Password</h3>
              <p>Store your passwords securely in one place. Simply add your account details and access them whenever you need. No more forgotten or insecure passwords.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-image-container">
              <img src={featureImage3} alt="Stored Password" className="feature-image" />
            </div>
            <div className="feature-text">
              <h3>Stored Passwords</h3>
              <p>Manage your saved passwords effortlessly. View, edit, or delete them in a few clicks. Easily update your passwords and stay in control of your security.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
