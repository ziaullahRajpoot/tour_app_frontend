import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';

import NavbarComponent from './components/NavbarComponent';
import HomePage from './components/homepage/HomePage';
import DestinationsPage from './components/destinations/DestinationPage';
import ContactUsPage from './components/contact/ContactUsPage';

import ProfilePage from './components/profilepage/Profile';
import TourGuideProfile from './components/profilepage/TourGuideProfile';
import EditTourGuideProfile from './components/profilepage/EditTourGuideProfile';

import HelpSupport from './components/support/HelpSupport';
import BillingPayments from './components/billing/BillingPayments';

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

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <CanvasAnimation />
      <NavbarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/destinations' element={<DestinationsPage/>}/>
        <Route path='/contact' element={<ContactUsPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/tour-guide/:tourGuideId" element={<TourGuideProfile />} />
        <Route path="/tour-guide/:tourGuideId/edit" element={<EditTourGuideProfile />} />
        <Route path="/inbox" element={<MessagingPage />} />
        <Route path="/liked-tourguides" element={<LikedTourGuidesPage likedGuides={likedGuides} />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/billing" element={<BillingPayments />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
