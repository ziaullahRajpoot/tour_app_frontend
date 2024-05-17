// App.jsx

import React, { useState } from 'react';
import "./App.css"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage'; // Import the ForgotPasswordPage component
import ResetPasswordPage from './components/ResetPasswordPage';

import NavbarComponent from './components/NavbarComponent';
import HomePage from './components/homepage/HomePage';
import TourGuideProfile from './components/tourguideprofile/TourGuideProfile'; // Keep this only
import EditTourGuideProfile from './components/tourguideprofile/EditTourGuideProfile';


import MessagingPage from './components/messages/MessagingPage'; // Adjust the import path as needed

import LikedTourGuidesPage from './components/likedTourGuides/LikedTourGuidesPage';

import Footer from './components/Footer';

function App() {
  const [likedGuides, setLikedGuides] = useState([]);

  const handleLike = (guideId) => {
    setLikedGuides(prev => {
      if (prev.includes(guideId)) {
        return prev.filter(id => id !== guideId);
      } else {
        return [...prev, guideId];
      }
    });
  };
  return (
    <Router>
      <NavbarComponent />
      <div className="container">
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Updated this line */}

          <Route path="/tour-guide/:tourGuideId" element={<TourGuideProfile />} />
          <Route path="/tour-guide/:tourGuideId/edit" element={<EditTourGuideProfile />} />

          <Route path="/inbox" element={<MessagingPage />} /> {/* Messaging page route */}
          {/* If ProfileComponent is different, import and define it */}

          
          <Route path="/liked-tourguides" element={<LikedTourGuidesPage likedGuides={likedGuides} />} />


        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
