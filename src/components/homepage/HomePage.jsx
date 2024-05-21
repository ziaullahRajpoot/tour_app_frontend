import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Import the map marker icon

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import tourGuides from '../../data/tourGuides';
import './HomePage.css'

function HomePage() {
  const [guides, setGuides] = useState(tourGuides); // Assuming tourGuides has the adjusted structure
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('username');
  const [likedGuides, setLikedGuides] = useState([]);

  useEffect(() => {
    const filteredGuides = tourGuides.filter(guide => {
      const term = searchTerm.toLowerCase();
      return (searchType === 'username' ? guide.name.toLowerCase().includes(term) : guide.location.toLowerCase().includes(term));
    });
    setGuides(filteredGuides);
  }, [searchTerm, searchType]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleLike = (id) => {
    if (likedGuides.includes(id)) {
      setLikedGuides(likedGuides.filter((guideId) => guideId !== id));
    } else {
      setLikedGuides([...likedGuides, id]);
    }
  };

  return (
    <div className='homepage'>
      <h2>Tour Guides</h2>
      <div className="row my-3">
        <div className="col-7 col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${searchType}...`}
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
            <option value="location">Location</option>
          </select>
        </div>
      </div>
      <div className="row">
        {guides.map((guide) => (
          <div key={guide.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-img-top-container position-relative">
                <Slider {...sliderSettings}>
                  {guide.imageUrls.map((url, index) => (
                    <div key={index}>
                      <img src={url} className="card-img-top" alt={`Image ${index + 1} for ${guide.name}`} />
                    </div>
                  ))}
                </Slider>
                <button onClick={() => handleLike(guide.id)} className="like-button position-absolute top-0 end-0 m-2 btn btn-light">
                  <FontAwesomeIcon icon={likedGuides.includes(guide.id) ? fasHeart : farHeart} />
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/tour-guide/${guide.name.toLowerCase().replace(/\s+/g, '-')}`}>{guide.name}</Link>
                </h5>
                <span>I'm {guide.name} and I'm here to assist you on your journey to {guide.location}.</span>
                <p style={{ marginTop: '1rem' }} className="card-text">
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
