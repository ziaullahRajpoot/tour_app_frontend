import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../style/Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'fade-in' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              Travel Globe is your ultimate destination for exploring the world. We provide comprehensive travel guides, expert recommendations, and personalized trip planning services to make your travel experience unforgettable.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text">Home</Link></li>
              <li><Link to="/destinations" className="text">Destinations</Link></li>
              <li><Link to="/contact" className="text">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; 2024 Travel Globe : 
        <a className="text-light" href="https://yourcompany.com/"> TravelGlobe.com</a>
      </div>
    </footer>
  );
};

export default Footer;
