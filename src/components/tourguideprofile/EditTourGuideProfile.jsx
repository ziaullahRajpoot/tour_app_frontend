import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tourGuides from '../../data/tourGuides';
import './EditTourGuideProfile.css'; // Ensure you have the CSS
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function EditTourGuideProfile() {
  const { tourGuideId } = useParams();
  const navigate = useNavigate();
  
  const guideNameFromUrl = tourGuideId.replace(/-/g, ' ');

  const tourGuideDetails = tourGuides.find(guide => 
    guide.name.toLowerCase() === guideNameFromUrl
  );

  if (!tourGuideDetails) {
    return <div>Tour guide not found</div>;
  }

  const [formData, setFormData] = useState({
    name: tourGuideDetails.name,
    bio: tourGuideDetails.bio,
    description: tourGuideDetails.description,
    profilePicture: tourGuideDetails.profilePicture,
    portfolio: tourGuideDetails.portfolio.map((item, index) => ({ ...item, id: index })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prevState => ({
        ...prevState,
        profilePicture: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handlePortfolioChange = (e) => {
    const files = Array.from(e.target.files);
    const newPortfolio = files.map((file, index) => {
      return { type: 'image', url: URL.createObjectURL(file), id: formData.portfolio.length + index };
    });
    setFormData(prevState => ({
      ...prevState,
      portfolio: [...prevState.portfolio, ...newPortfolio]
    }));
  };

  const removePortfolioItem = (id) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      portfolio: prevFormData.portfolio.filter(item => item.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the formData to the backend
    // navigate back to the profile page after saving
    console.log(formData);
    navigate(`/tour-guide/${tourGuideId}`);
  };

  return (
    <div className="edit-tour-guide-page">
      <div className="edit-tour-guide-profile-container">
        <form onSubmit={handleSubmit} className="edit-tour-guide-profile-form">
          <div className="profile-header">
            <div className="profile-picture-container">
              <img src={formData.profilePicture} alt={formData.name} className="profile-picture"/>
              <label className="change-profile-picture-btn">
                <i className="fas fa-edit"></i>
                <input 
                  type="file" 
                  accept="image/*" 
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
                  value={formData.name} 
                  onChange={handleChange} 
                  className="form-control" 
                />
              </h2>
              <p className="bio">
                <textarea 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange} 
                  className="form-control"
                />
              </p>
            </div>
          </div>
          <div className="description-section">
            <h3>Description</h3>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="form-control"
            />
          </div>
          <div className="portfolio-section">
            <h3>Portfolio</h3>
            <div className="portfolio-wrapper">
              {formData.portfolio.map((item) => (
                <div key={item.id} className="portfolio-item">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={`Portfolio item ${item.id}`} className="portfolio-image" />
                  ) : (
                    <video src={item.url} controls className="portfolio-video" />
                  )}
                  <button onClick={() => removePortfolioItem(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <label className="btn btn-primary add-portfolio-btn">
              <i className="fas fa-upload"></i> Add Portfolio Items
              <input 
                type="file" 
                accept="image/*,video/*" 
                multiple 
                onChange={handlePortfolioChange} 
                style={{ display: 'none' }}
              />
            </label>
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
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditTourGuideProfile;
