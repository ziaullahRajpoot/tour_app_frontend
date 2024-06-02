import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './TourGuideProfile.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InboxComponent from '../chat/InboxComponent';
import { SERVER_URL } from '../../constants';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample image URLs
const SAMPLE_PROFILE_IMAGE_URL = 'https://via.placeholder.com/150';
const SAMPLE_PORTFOLIO_IMAGE_URLS = [
  'https://via.placeholder.com/300?text=Image+1',
  'https://via.placeholder.com/300?text=Image+2',
  'https://via.placeholder.com/300?text=Image+3'
];

function TourGuideProfile() {
  const { tourGuideId } = useParams();
  const [tourGuideDetails, setTourGuideDetails] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
          if (!data.profile || !data.TourGuide[0]?.city || !data.bio || !data.description) {
            setShowModal(true);
          }
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

  useEffect(() => {
    setModalOpen(showModal);
  }, [showModal]);

  useEffect(() => {
    if (!modalOpen) {
      document.body.classList.remove('modal-open');
    }
  }, [modalOpen]);

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
    role = 'No role specified',
    bio = 'No bio available',
    description = 'No description available',
    email = 'No email available',
    phone = 'No phone number found',
    profile = null,
    TourGuide = []
  } = tourGuideDetails;

  const city = TourGuide[0]?.city || 'No location specified';
  const profilePicture = profile ? profile : SAMPLE_PROFILE_IMAGE_URL;
  const portfolioItems = TourGuide[0]?.images.length ? TourGuide[0].images : SAMPLE_PORTFOLIO_IMAGE_URLS.map(url => ({ type: 'image', url }));

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
            <p className="location"><b>Location: </b>{city}</p>
            <p className="email"><b>Email: </b>{email}</p>
            <p className="phone"><b>Phone: </b>{phone}</p>
            <h3>Description</h3>
            <p>{description}</p>
          </div>
          <div className="portfolio-section">
            <h3>Portfolio</h3>
            <Slider {...sliderSettings}>
              {portfolioItems.map((item, index) => (
                <div key={index} className="portfolio-item">
                  <img src={item.url} alt={`Portfolio item ${index + 1}`} className="portfolio-image" />
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
        </div>
      </div>
      <InboxComponent messages={tourGuideDetails.messages || []} />

    </div>
  );
}

export default TourGuideProfile;
