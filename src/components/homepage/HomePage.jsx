import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.css';
import sampleImage from '../../assets/sampleImage.jpeg'; // Ensure this image is in the correct path
import tourguide from '../../assets/tour_guide_2.jpg';
import tour1 from '../../assets/tour_img_6.avif';
import tour2 from '../../assets/tour_img_5.jpg';
import tour3 from '../../assets/tour_img_4.jpeg';
import { SERVER_URL } from '../../constants/';

const HomePage = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('username');
  const [likedGuides, setLikedGuides] = useState([]);
  const [error, setError] = useState('');
  const [currentImageBrightness, setCurrentImageBrightness] = useState(255);
  const [currentPage, setCurrentPage] = useState(1);
  const [guidesPerPage] = useState(20);
  const [totalGuides, setTotalGuides] = useState(0);

  const fetchGuides = async (page = 1) => {
    try {
      const response = await axios.get(`${SERVER_URL}/tour-guides?page=${page}&limit=${guidesPerPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      const { success, body, total } = response.data;

      if (success) {
        const guidesWithLocations = body.map((guide, index) => ({
          ...guide,
          location: randomLocations[index % randomLocations.length],
        }));
        setGuides(guidesWithLocations);
        setFilteredGuides(guidesWithLocations);
        setTotalGuides(total); // Set the total guides count
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching data.');
    }
  };

  const randomLocations = [
    'New York, USA',
    'Paris, France',
    'Tokyo, Japan',
    'Berlin, Germany',
    'Sydney, Australia',
    'Cape Town, South Africa',
    'Rio de Janeiro, Brazil',
    'Moscow, Russia',
    'Toronto, Canada',
    'Dubai, UAE',
  ];

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    const terms = searchTerm.trim().toLowerCase().split(/\s+/);
    const filtered = guides.filter(guide => {
      const firstName = (guide.firstName || '').trim().toLowerCase();
      const lastName = (guide.lastName || '').trim().toLowerCase();
      const location = (guide.location || '').trim().toLowerCase();

      return searchType === 'username'
        ? terms.some(term => firstName.includes(term) || lastName.includes(term))
        : terms.some(term => location.includes(term));
    });
    setFilteredGuides(filtered);
    setCurrentPage(1);  // Reset to first page when filtering
  }, [searchTerm, searchType, guides]);

  const getImageBrightness = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        let totalBrightness = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          totalBrightness += (r + g + b) / 3;
        }
        const averageBrightness = totalBrightness / (imageData.data.length / 3);
        resolve(averageBrightness);
      };
    });
  };

  const handleSlideChange = async (index, guide) => {
    let imageUrl = guide.imageUrls && guide.imageUrls.length > 0 ? guide.imageUrls[index] : SAMPLE_IMAGES[index];
    if (index >= SAMPLE_IMAGES.length) {
      imageUrl = SAMPLE_IMAGES[0];
    }
    const brightness = await getImageBrightness(imageUrl);
    setCurrentImageBrightness(brightness);
  };

  const sliderSettings = (guide) => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (index) => handleSlideChange(index, guide),
    prevArrow: <CustomPrevArrow brightness={currentImageBrightness} />,
    nextArrow: <CustomNextArrow brightness={currentImageBrightness} />
  });

  const CustomPrevArrow = ({ onClick, brightness }) => (
    <button
      className="slick-prev"
      onClick={onClick}
      style={{
        color: brightness < 128 ? '#fff' : '#000',
        background: 'transparent',
        border: 'none',
      }}
    >
      &#9664;
    </button>
  );

  const CustomNextArrow = ({ onClick, brightness }) => (
    <button
      className="slick-next"
      onClick={onClick}
      style={{
        color: brightness < 128 ? '#fff' : '#000',
        background: 'transparent',
        border: 'none',
      }}
    >
      &#9654;
    </button>
  );

  const SAMPLE_IMAGES = [
    tour1,
    tour2,
    tour3
  ];

  // Pagination logic
  const totalPages = Math.ceil(totalGuides / guidesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchGuides(page);
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
                <Slider {...sliderSettings(guide)}>
                  <div>
                    <img src={tourguide} className="card-img-top" alt="Sample" />
                  </div>
                  {guide.imageUrls && guide.imageUrls.length > 0 ? (
                    guide.imageUrls.map((url, index) => (
                      <div key={index}>
                        <img src={url} className="card-img-top" alt={`Image ${index + 1} for ${guide.firstName}`} />
                      </div>
                    ))
                  ) : (
                    SAMPLE_IMAGES.map((url, index) => (
                      <div key={index}>
                        <img src={url} className="card-img-top" alt={`Sample Image ${index + 1}`} />
                      </div>
                    ))
                  )}
                </Slider>
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
      {totalPages > 0 && (
        <div className="pagination mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn btn-light mx-1"
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-light mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="btn btn-light mx-1"
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
