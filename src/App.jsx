import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"

import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';

import NavbarComponent from './components/NavbarComponent';
import HomePage from './components/homepage/HomePage';
import TourGuideProfile from './components/tourguideprofile/TourGuideProfile';
import EditTourGuideProfile from './components/tourguideprofile/EditTourGuideProfile';

import MessagingPage from './components/chat/MessagingPage';
import LikedTourGuidesPage from './components/likedTourGuides/LikedTourGuidesPage';

import Footer from './components/Footer';
import CanvasAnimation from './components/CanvasAnimation';

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
      <CanvasAnimation />
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/tour-guide/:tourGuideId" element={<TourGuideProfile />} />
        <Route path="/tour-guide/:tourGuideId/edit" element={<EditTourGuideProfile />} />
        <Route path="/tour-guide" element={<EditTourGuideProfile />} />
        <Route path="/inbox" element={<MessagingPage />} />
        <Route path="/liked-tourguides" element={<LikedTourGuidesPage likedGuides={likedGuides} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
