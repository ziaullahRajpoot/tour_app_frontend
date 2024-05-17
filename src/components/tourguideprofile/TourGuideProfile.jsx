import React from 'react';
import { useParams, Link } from 'react-router-dom';
import tourGuides from '../../data/tourGuides';
import './TourGuideProfile.css'; // Ensure you have the CSS
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import InboxComponent from '../messages/InboxComponent';

function TourGuideProfile() {
  const { tourGuideId } = useParams(); // This will be something like "john-doe"
  
  // Convert the URL parameter back to the original format to match against the guide's name
  const guideNameFromUrl = tourGuideId.replace(/-/g, ' ');

  const tourGuideDetails = tourGuides.find(guide => 
    guide.name.toLowerCase() === guideNameFromUrl
  );

  if (!tourGuideDetails) {
    return <div>Tour guide not found</div>;
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // Tablet and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600, // Mobile and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Example messages data - this should come from your tourGuideDetails or similar
  const messages = tourGuideDetails.messages || [
    { senderName: "Client 1", text: "Hello, I'm interested in your tour." },
    { senderName: "Client 2", text: "Can you provide more details about the trip?" },
    { senderName: "Client 1", text: "Hello, I'm interested in your tour." },
    { senderName: "Client 2", text: "Can you provide more details about the trip?" },
    { senderName: "Client 1", text: "Hello, I'm interested in your tour." },
    { senderName: "Client 2", text: "Can you provide more details about the trip?" },
    // Add more messages as examples...
  ];

  return (
    <div className="tour-guide-page">
      <div className="tour-guide-profile-container">{/* This wraps the existing profile content */}
        <div className="tour-guide-profile">
          <div className="profile-header">
            <img src={tourGuideDetails.profilePicture} alt={tourGuideDetails.name} className="profile-picture"/>
            <div className="profile-info">
              <h2>{tourGuideDetails.name}</h2>
              <p className="bio">{tourGuideDetails.bio}</p>
              <Link to={`/tour-guide/${tourGuideId}/edit`} className="btn btn-primary">Edit Profile</Link>
            </div>
          </div>
          <div className="description-section">
            <h3>Description</h3>
            <p>{tourGuideDetails.description}</p>
          </div>
          <div className="portfolio-section">
            <h3>Portfolio</h3>
            <Slider {...sliderSettings}>
              {tourGuideDetails.portfolio.map((item, index) => (
                <div key={index} className="portfolio-item">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={`Portfolio item ${index + 1}`} className="portfolio-image" />
                  ) : (
                    <video src={item.url} controls className="portfolio-video" />
                  )}
                </div>
              ))}
            </Slider>
          </div>
          <div className="feedback-section">
            <h3>Feedback</h3>
            <div className="feedback-items">
              {tourGuideDetails.feedback.map((feedback, index) => (
                <div key={index} className="feedback-item">
                  <p className="rating">Rating: {feedback.stars} / 5</p>
                  <p className="comment">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bookings-section">
            <h3>Bookings</h3>
            {/* Implement bookings display as needed */}
          </div>
        </div>
      </div>
      <InboxComponent messages={messages} />
    </div>
  );
}

export default TourGuideProfile;
