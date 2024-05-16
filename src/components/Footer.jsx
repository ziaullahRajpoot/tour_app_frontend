// // src/components/Footer.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css'; // Make sure to create and link a CSS file for styling

// const Footer = () => {
//   return (
//     <footer class="site-footer">
//         <div class="footer-content">
//             <div class="footer-section categories">
//             <h6>Categories</h6>
//             <ul>
//                 <li><a href="#">Graphics & Design</a></li>
               
//             </ul>
//             </div>
           
//         </div>
//         <div class="footer-bottom">
//             <p>© Your Company 2024</p>
           
//         </div>
//     </footer>

//   );
// };

// export default Footer;
// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Footer Content</h5>
            <p>
              Here you can use rows and columns to organize your footer content.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/" className="text-dark">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-dark">About</Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Travel Globe :  
        <a className="text-dark" href="https://yourcompany.com/">TravelGlobe.com</a>
      </div>
    </footer>
  );
};

export default Footer;
