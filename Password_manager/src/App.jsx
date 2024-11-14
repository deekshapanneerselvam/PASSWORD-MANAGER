import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Main from './components/Main';
import PasswordGenerator from './components/PasswordGenerator';
import AddPassword from './components/AddPassword'; 
import StoredPassword from './components/StoredPassword'; 
import StoredCardDetails from './components/StoredCardDetails'; 
import AddCardDetails from './components/AddCardDetails'; 
import PhoneVerification from './components/PhoneVerification';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /></>} />
        <Route path="/phone-verification" element={<PhoneVerification />} /> 
        <Route path="/main" element={<Main />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/add-password" element={<AddPassword />} /> 
        <Route path="/stored-password" element={<StoredPassword />} /> 
        <Route path="/stored-card-details" element={<StoredCardDetails />} /> 
        <Route path="/add-card-details" element={<AddCardDetails />} /> 
      </Routes>
    </Router>
  );
};

export default App;
