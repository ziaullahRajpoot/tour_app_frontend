import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './TourGuideProfile.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InboxComponent from '../chat/InboxComponent';
import { SERVER_URL } from '../../constants';

function TourGuideProfile() {
  const { tourGuideId } = useParams();
  const [tourGuideDetails, setTourGuideDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTourGuideDetails = async () => {
      if (!tourGuideId) {
        setError('Invalid tour guide ID');
        return;
      }

      try {
        const response = await axios.post(`${SERVER_URL}/tour-guides/profile`, { 'id': parseInt(tourGuideId) }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        const { status, data } = response.data;
        console.log('Status', status, 'Body', data);
        if (status) {
          setTourGuideDetails(data);
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

  const {
    firstName = '',
    lastName = '',
    bio = 'No bio available',
    description = 'No description available',
    profile = null,
    TourGuide = []
  } = tourGuideDetails;

  const profilePicture = profile ? profile : 'sample-profile-picture-url'; // Replace with actual URL or import of a sample image
  const portfolioItems = TourGuide[0]?.images.length ? TourGuide[0].images : [{ type: 'image', url: 'sample-image-url' }]; // Replace with actual URL or import of a sample image

  return (
    <div className="container tour-guide-page">
      <div className="tour-guide-profile-container">
        <div className="tour-guide-profile">
          <div className="profile-header">
            <img src={profilePicture} alt={`${firstName} ${lastName}`} className="profile-picture" />
            <div className="profile-info">
              <h2>{firstName} {lastName}</h2>
              <p className="bio">{bio}</p>
              <Link to={`/tour-guide/${tourGuideId}/edit`} className="btn btn-primary">Edit Profile</Link>
            </div>
          </div>
          <div className="description-section">
            <h3>Description</h3>
            <p>{description}</p>
          </div>
          <div className="portfolio-section">
            <h3>Portfolio</h3>
            <Slider {...sliderSettings}>
              {portfolioItems.map((item, index) => (
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
              {(tourGuideDetails.feedback?.map((feedback, index) => (
                <div key={index} className="feedback-item">
                  <p className="rating">Rating: {feedback.stars} / 5</p>
                  <p className="comment">{feedback.comment}</p>
                </div>
              ))) ?? []}
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
