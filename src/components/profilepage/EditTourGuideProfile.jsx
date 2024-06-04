import React, { useState } from 'react';
import './EditTourGuideProfile.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router-dom';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import { SERVER_URL } from '../../constants';

function EditTourGuideProfile() {
  const location = useLocation();
  const tourGuide = location.state.data;

  const [profile, setProfile] = useState(tourGuide.profile ?? '');
  const [name, setName] = useState(`${tourGuide.firstName} ${tourGuide.lastName}`);
  const [description, setDescription] = useState(tourGuide.description ?? undefined);
  const [bio, setBio] = useState(tourGuide.bio??undefined);
  const [portfolio, setPortfolio] = useState(tourGuide.portfolio ?? []);

  const [newPortfolio, setNewPortfolio] = useState([]);

  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log('File', file);

    const reader = new FileReader();

    reader.onloadend = () => {

      console.log('PATTTTTH', reader.result);

      return setProfile(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handlePortfolioChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // const imageFiles = files.filter(file => file.type.startsWith('image'));

    // const imageFileURLs = imageFiles.map(file => URL.createObjectURL(file));

    setNewPortfolio(files);
  };

  const removePortfolioItem = (img) => {
    setPortfolio(portfolio.filter((e) => e != img));
  };

  const calculateAverageRating = () => {
    // Calculate average rating overall
    // const totalStars = tourGuideDetails.feedback.reduce((acc, feedback) => acc + feedback.stars, 0);
    // const averageRating = totalStars / tourGuideDetails.feedback.length;
    // return isNaN(averageRating) ? 0 : averageRating.toFixed(1);

    return 0;
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (profile !== tourGuide.profile) {
      setProfile(await uploadFile(profile, '/profiles'));
    }

    if (newPortfolio.length !== 0) {
      setNewPortfolio(newPortfolio.map(async (e) => await uploadFile(e, '/portfolios')));
    }

    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    const body = {
      description,
      bio,
      portfolio: [...portfolio, newPortfolio],
      firstName, lastName,
    }

    const response = await axios.patch(`${SERVER_URL}/tour-guides/profile`, body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });


    const { status, data } = response.data;

    console.log('Status', status, 'Data', data);

  }

  const uploadFile = async (path, directory) => {

    console.log('Path', path, 'Dire', directory);

    try {
      const formData = new FormData();

      // Fetch the file from the given path
      const response = await fetch(path);
      const blob = await response.blob();
      const file = new File([blob], path.split('/').pop(), { type: blob.type });

      // Append the file and directory to FormData
      formData.append('files', file);
      formData.append('path', directory);

      // Send the POST request with Axios
      const result = await axios.post(`${SERVER_URL}/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response', response.data);

      return result.data;

    } catch (e) {

      throw new Error('could not upload file', e.result.data)
    }
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    if (halfStar) {
      stars.push(<span key={fullStars} className="star">½</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={fullStars + i + 1} className="star inactive">☆</span>);
    }

    return stars;
  };


  return (
    <div className="edit-tour-guide-profile-container col-12">
      <div className="edit-profile-section col-12 col-md-8">
        <form className="edit-tour-guide-profile-form">
          <div className="profile-header">
            <div className="profile-picture-container">
              <img src={profile ?? 'https://via.placeholder.com/150'} className="profile-picture" />
              <label className="change-profile-picture-btn">
                <i className="fas fa-edit"></i>
                <input
                  type="file"
                  onChange={handleProfilePictureChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="profile-info">
              <h2>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </h2>
              <p className="bio">
                <textarea
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-control"
                />
              </p>
            </div>
          </div>
          <div className="description-section">
            <h3>Description</h3>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="portfolio-section">
            <h3>Portfolio</h3>
            <div className="portfolio-wrapper">
              {[...portfolio, ...newPortfolio].map((item, index) => (
                <div key={`${item.id}-${index}`} className="portfolio-item">
                  <img src={item} alt={`Portfolio item ${item}`} className="portfolio-image" />
                  <button onClick={() => removePortfolioItem(item)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <label className="btn btn-primary add-portfolio-btn">
              <i className="fas fa-upload"></i> Add Portfolio Items
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePortfolioChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="feedback-section">
            <h3>Feedback ({tourGuide?.feedback?.length ?? 0})</h3>
            <div className="average-rating">
              Average Rating: {renderStars(calculateAverageRating())}
            </div>
            <div className="feedback-container">
              <div className="feedback-items">
                {tourGuide?.feedback?.map((feedback, index) => (
                  <div key={index} className="feedback-item">
                    <div className="user-info">
                      <img src={tourGuide.profilePicture} alt={tourGuide.name} className="profile-img" />
                      <p className="user-name">{tourGuide.name}</p>
                    </div>
                    <div className="rating">
                      {Array(feedback.stars).fill().map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                      {Array(5 - feedback.stars).fill().map((_, i) => (
                        <span key={i} className="star inactive">☆</span>
                      ))}
                    </div>
                    <p className="comment">{feedback.comment}</p>
                  </div>
                )) ?? []}
              </div>
            </div>
          </div>
          <button onClick={updateProfile}>Update Profile</button>
        </form>
      </div>


      {/* <div className="bookings-section col-12 col-md-4">
        <h3 className="section-title">Upcoming Bookings</h3>
        <div className="bookings-list">
          {tourGuide?.bookings?.map((booking, index) => (
            <div key={index} className="booking-item">
              <div className="booking-info">
                <p className="booking-date">{booking.date}</p>
                <p className="booking-client">Client: {booking.client}</p>
              </div>
              <div className="booking-actions">
                <button className="btn btn-cancel">Cancel</button>
              </div>
            </div>
          )) ?? []}
        </div>
      </div> */}
    </div>

  );
}

export default EditTourGuideProfile;
