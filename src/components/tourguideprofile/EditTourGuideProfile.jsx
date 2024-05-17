import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tourGuides from '../../data/tourGuides';
import axios from 'axios';
import './EditTourGuideProfile.css'; // Ensure you have the CSS

function EditTourGuideProfile() {
  const { tourGuideId } = useParams();
  const navigate = useNavigate();

  // Convert the URL parameter back to the original format to match against the guide's name
  const guideNameFromUrl = tourGuideId.replace(/-/g, ' ');

  const tourGuideDetails = tourGuides.find(guide => 
    guide.name.toLowerCase() === guideNameFromUrl
  );

  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    description: '',
    portfolio: [],
    feedback: [],
    profilePicture: '',
  });

  useEffect(() => {
    if (tourGuideDetails) {
      setProfileData(tourGuideDetails);
    }
  }, [tourGuideDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfileData({
      ...profileData,
      [name]: files[0], // assuming only one file is selected
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    try {
      const response = await axios.put(`http://127.0.0.1:3000/tourguides/${tourGuideId}`, profileData);
      console.log('Profile updated successfully:', response.data);
      navigate(`/tour-guide/${tourGuideId}`);
    } catch (error) {
      console.error('Error updating profile:', error.response.data);
    }
  };

  if (!tourGuideDetails) {
    return <div>Tour guide not found</div>;
  }

  return (
    <div className="edit-tour-guide-profile container mt-5 mb-5">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={profileData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea className="form-control" id="bio" name="bio" value={profileData.bio} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={profileData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
          <input type="file" className="form-control" id="profilePicture" name="profilePicture" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditTourGuideProfile;
