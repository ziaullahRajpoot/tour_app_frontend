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
import sampleImage from '../../assets/sampleImage.jpeg'; // Ensure this image is in the correct path
import { SERVER_URL } from '../../constants/';

const HomePage = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('username');
  const [likedGuides, setLikedGuides] = useState([]);
  const [error, setError] = useState('');

  const fetchGuides = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/tour-guides`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
    const terms = searchTerm.trim().toLowerCase().split(/\s+/); // Trim whitespace and split by spaces
    const filtered = guides.filter(guide => {
      const firstName = (guide.firstName || '').trim().toLowerCase(); // Trim whitespace and convert to lowercase
      const lastName = (guide.lastName || '').trim().toLowerCase(); // Trim whitespace and convert to lowercase
      const location = (guide.location || '').trim().toLowerCase(); // Trim whitespace and convert to lowercase
  
      return searchType === 'username'
        ? terms.some(term => firstName.includes(term) || lastName.includes(term)) // Check if any term matches first name or last name
        : terms.some(term => location.includes(term)); // Check if any term matches location
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
            placeholder={`Search by ${searchType === 'username' ? 'Name' : 'Location'}...`}
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
        {filteredGuides.map((guide) => (
          <div key={guide.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <div className="card-img-top-container position-relative">
                {guide.imageUrls && guide.imageUrls.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {guide.imageUrls.map((url, index) => (
                      <div key={index}>
                        <img src={url} className="card-img-top" alt={`Image ${index + 1} for ${guide.firstName}`} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img src={sampleImage} className="card-img-top" alt="Sample" />
                )}
                <button onClick={() => handleLike(guide.id)} className="like-button position-absolute top-0 end-0 m-2 btn btn-light">
                  <FontAwesomeIcon icon={likedGuides.includes(guide.id) ? fasHeart : farHeart} />
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/tour-guide/${guide.id}`}>{guide.firstName} {guide.lastName}</Link>
                </h5>
                <p className="card-text">{guide.description || "No description available."}</p>
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
