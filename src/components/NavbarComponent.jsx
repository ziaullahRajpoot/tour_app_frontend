// src/components/NavbarComponent.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import './NavbarComponent.css';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, message: "You have a new message!" },
    { id: 2, message: "Your booking is confirmed." },
    { id: 3, message: "Reminder: Upcoming tour tomorrow." },
  ];

  const renderNotificationPopover = (
    <Popover id="notification-popover">
      <Popover.Header as="h3">Notifications</Popover.Header>
      <Popover.Body>
        <ul className="list-unstyled">
          {notifications.slice(0, 5).map(notification => (
            <li key={notification.id} className="nav-item-link mb-2" onClick={() => navigate('/notifications')}>
              {notification.message}
            </li>
          ))}
          <li className="nav-item-link see-all-notifications" onClick={() => navigate('/all-notifications')}>
            See all notifications
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );
  const renderProfilePopover = (
    <Popover id="profile-popover">
      <Popover.Body>
        <div className="nav-item-link" onClick={() => navigate('/profile')}>Profile</div>
        <div className="nav-item-link" onClick={() => navigate('/settings')}>Settings</div>
        <div className="nav-item-link" onClick={() => navigate('/billing')}>Billing & Payments</div>
        <div className="nav-item-link" onClick={() => navigate('/help')}>Help & Support</div>
        <div className="nav-item-link" onClick={() => navigate('/logout')}>Logout</div>
      </Popover.Body>
    </Popover>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">Travel Globe</Link>
        
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item d-lg-none"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/liked-tourguides">Liked Tourguides</Link></li>
            <li className="nav-item d-none d-lg-block"><Link className="nav-link" to="/liked-tourguides"><FontAwesomeIcon icon={faHeart} /></Link></li>
            
            <li className="nav-item d-lg-none">
              <Link className="nav-link" to="/notifications">Notifications</Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <OverlayTrigger trigger="click" placement="bottom" overlay={renderNotificationPopover}>
                <Button variant="light" className="nav-link"><FontAwesomeIcon icon={faBell} /></Button>
              </OverlayTrigger>
            </li>

            <li className="nav-item d-lg-none"><Link className="nav-link" to="/inbox">Inbox</Link></li>
            <li className="nav-item d-none d-lg-block"><Link className="nav-link" to="/inbox"><FontAwesomeIcon icon={faEnvelope} /></Link></li>
            <li className="nav-item d-none d-lg-block">
                {/* Profile icon always visible, not collapsible */}
                <OverlayTrigger trigger="click" placement="bottom" overlay={renderProfilePopover}>
                <Button variant="light"><FontAwesomeIcon icon={faUser} /></Button>
                </OverlayTrigger>
            </li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/bookings">Bookings</Link></li>

            {/* Profile text links for mobile view */}
            
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/settings">Settings</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/billing">Billing & Payments</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/help">Help & Support</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/logout">Logout</Link></li>
          </ul>
        </div>

        
      </div>
    </nav>
  );
};

export default NavbarComponent;
