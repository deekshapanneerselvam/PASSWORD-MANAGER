import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Don't forget to import the necessary styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './PhoneVerification.css';

function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState(''); // State to store the phone number
  const navigate = useNavigate(); // Hook for navigating to different pages

  const handlePhoneChange = (value) => {
    setPhoneNumber(value); // Update the state with the selected phone number
  };

  const handleSubmit = () => {
    console.log('Phone number:', phoneNumber);
    // Redirect to the main page (or any other page) after phone number verification
    navigate('/main'); // Replace '/main' with the actual route of your main page
  };

  return (
    <div className='phone-signin'>
      <h2>Phone Verification</h2>
      <PhoneInput
        country={'us'} // Default country
        value={phoneNumber} // Bind the state to the value prop
        onChange={handlePhoneChange} // Handle phone number change
      />
      <button onClick={handleSubmit}>Verify Phone Number</button>
    </div>
  );
}

export default PhoneVerification;
