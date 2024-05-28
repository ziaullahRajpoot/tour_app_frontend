import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover, Button, Tooltip } from 'react-bootstrap'; // Corrected import statement
import './NavbarComponent.css';



const handleLogout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');
  
  // Redirect the user to the login page
  navigate('/login');
};
const NavbarComponent = () => {
  const navigate = useNavigate();

  const [isNotificationIconHovered, setIsNotificationIconHovered] = useState(false);
  const [isNotificationPopoverHovered, setIsNotificationPopoverHovered] = useState(false);
  const [isProfileIconHovered, setIsProfileIconHovered] = useState(false);
  const [isProfilePopoverHovered, setIsProfilePopoverHovered] = useState(false);

  const notifications = [
    { id: 1, message: "You have a new message!" },
    { id: 2, message: "Your booking is confirmed." },
    { id: 3, message: "Reminder: Upcoming tour tomorrow." },
  ];
  
   // Tooltip texts
   const heartTooltip = "Liked Tourguides";
   const inboxTooltip = "Inbox";

  const handleMouseEnter = (setIsHovered) => () => {
    setIsHovered(true);
  };

  const handleMouseLeave = (setIsHovered) => () => {
    setIsHovered(false);
  };

  const renderNotificationPopover = (
    <Popover id="notification-popover" onMouseEnter={handleMouseEnter(setIsNotificationPopoverHovered)} onMouseLeave={handleMouseLeave(setIsNotificationPopoverHovered)}>
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
    <Popover id="profile-popover" onMouseEnter={handleMouseEnter(setIsProfilePopoverHovered)} onMouseLeave={handleMouseLeave(setIsProfilePopoverHovered)}>
      <Popover.Body>
        <div className="nav-item-link" onClick={() => navigate('/profile')}>Profile</div>
        <div className="nav-item-link" onClick={() => navigate('/settings')}>Settings</div>
        <div className="nav-item-link" onClick={() => navigate('/billing')}>Billing & Payments</div>
        <div className="nav-item-link" onClick={() => navigate('/help')}>Help & Support</div>
        <div className="nav-item-link" onClick={() => handleLogout(navigate)}>Logout</div>
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
            <li className="nav-item d-none d-lg-block">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{heartTooltip}</Tooltip>}
              >
                <Link className="nav-link" to="/liked-tourguides">
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </OverlayTrigger>
            </li>
            <li className="nav-item d-lg-none">
              <Link className="nav-link" to="/notifications">Notifications</Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={renderNotificationPopover}
                show={isNotificationIconHovered || isNotificationPopoverHovered}
              >
                <Button
                  variant="light"
                  className="nav-link"
                  onMouseEnter={handleMouseEnter(setIsNotificationIconHovered)}
                  onMouseLeave={handleMouseLeave(setIsNotificationIconHovered)}
                >
                  <FontAwesomeIcon icon={faBell} />
                </Button>
              </OverlayTrigger>
            </li>

            <li className="nav-item d-lg-none"><Link className="nav-link" to="/inbox">Inbox</Link></li>
            <li className="nav-item d-none d-lg-block">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{inboxTooltip}</Tooltip>}
              >
                <Link className="nav-link" to="/inbox">
                  <FontAwesomeIcon icon={faEnvelope} />
                </Link>
              </OverlayTrigger>
            </li>
            <li className="nav-item d-none d-lg-block">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={renderProfilePopover}
                show={isProfileIconHovered || isProfilePopoverHovered}
              >
                <Button
                  variant="light"
                  onMouseEnter={handleMouseEnter(setIsProfileIconHovered)}
                  onMouseLeave={handleMouseLeave(setIsProfileIconHovered)}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              </OverlayTrigger>
            </li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/bookings">Bookings</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/settings">Settings</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/billing">Billing & Payments</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" to="/help">Help & Support</Link></li>
            <li className="nav-item d-lg-none"><Link className="nav-link" onClick={() => handleLogout(navigate)}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default NavbarComponent;
