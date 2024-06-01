import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link } from 'react-router-dom';
import "../style/Footer.css"

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'fade-in' : ''}`}>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3">About Us</h5>
            <p>
              Travel Globe is your ultimate destination for exploring the world. We provide comprehensive travel guides, expert recommendations, and personalized trip planning services to make your travel experience unforgettable.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark">Home</Link></li>
              <li><Link to="/destinations" className="text-dark">Destinations</Link></li>
              <li><Link to="/tours" className="text-dark">Tours</Link></li>
              <li><Link to="/contact" className="text-dark">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark">Facebook</a></li>
              <li><a href="#" className="text-dark">Twitter</a></li>
              <li><a href="#" className="text-dark">Instagram</a></li>
              <li><a href="#" className="text-dark">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; 2024 Travel Globe :  
        <a className="text-dark" href="https://yourcompany.com/">TravelGlobe.com</a>
      </div>
    </footer>
  );
};

export default Footer;
