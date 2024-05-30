import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './TourGuideProfile.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InboxComponent from '../chat/InboxComponent';

function TourGuideProfile() {
  const { tourGuideId } = useParams();
  
  const [tourGuideDetails, setTourGuideDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Tour Guide ID:', tourGuideId);  // Log the tourGuideId for debugging
    const fetchTourGuideDetails = async () => {
      if (!tourGuideId) {
        setError('Invalid tour guide ID');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:3000/tour-guide/${tourGuideId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const { success, body } = response.data;
        if (success) {
          setTourGuideDetails(body);
        } else {
          setError('Tour guide not found');
        }
      } catch (error) {
        console.error('Error fetching tour guide details:', error);
        setError(error.response?.data?.message || 'An error occurred while fetching data.');
      }
    };

    fetchTourGuideDetails();
  }, [tourGuideId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!tourGuideDetails) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container tour-guide-page">
      <div className="tour-guide-profile-container">
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
          </div>
        </div>
      </div>
      <InboxComponent messages={tourGuideDetails.messages || []} />
    </div>
  );
}

export default TourGuideProfile;
