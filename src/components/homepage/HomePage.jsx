// HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HomePage.css';


function HomePage() {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('username');
  const [likedGuides, setLikedGuides] = useState([]);
  const [error, setError] = useState('');

  const fetchGuides = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/tour-guides', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const { success, body } = response.data;
      if (success) {
        setGuides(body);
        setFilteredGuides(body);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = guides.filter(guide => {
      return searchType === 'username'
        ? guide.firstName.toLowerCase().includes(term) || guide.lastName.toLowerCase().includes(term)
        : guide.email.toLowerCase().includes(term);
    });
    setFilteredGuides(filtered);
  }, [searchTerm, searchType, guides]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleLike = (id) => {
    setLikedGuides(prevLikedGuides =>
      prevLikedGuides.includes(id)
        ? prevLikedGuides.filter(guideId => guideId !== id)
        : [...prevLikedGuides, id]
    );
  };

  return (
    <div className='homepage'>
      <h2>Tour Guides</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row my-3">
        <div className="col-7 col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${searchType === 'username' ? 'Name' : 'Email'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-5 col-md-2">
          <select
            className="form-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="username">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredGuides.map((guide) => (
          <div key={guide.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-img-top-container position-relative">
                <Slider {...sliderSettings}>
                  {guide.imageUrls ? guide.imageUrls.map((url, index) => (
                    <div key={index}>
                      <img src={url} className="card-img-top" alt={`Image ${index + 1} for ${guide.firstName}`} />
                    </div>
                  )) : <div>No images available</div>}
                </Slider>
                <button onClick={() => handleLike(guide.id)} className="like-button position-absolute top-0 end-0 m-2 btn btn-light">
                  <FontAwesomeIcon icon={likedGuides.includes(guide.id) ? fasHeart : farHeart} />
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                <Link to={`/tour-guide/${guide.id}`}>{guide.firstName} {guide.lastName}</Link>

                </h5>
                <p className="card-text">I'm {guide.firstName} and I'm here to assist you on your journey to {guide.email}.</p>
                <p className="card-text mt-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {guide.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
