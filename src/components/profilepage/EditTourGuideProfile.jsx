// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import tourGuides from '../../data/tourGuides';
// import './EditTourGuideProfile.css'; // Ensure you have the CSS
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// function EditTourGuideProfile() {
//   const { tourGuideId } = useParams();
//   const navigate = useNavigate();
  
//   const guideNameFromUrl = tourGuideId.replace(/-/g, ' ');

//   const tourGuideDetails = tourGuides.find(guide => 
//     guide.name.toLowerCase() === guideNameFromUrl
//   );

//   if (!tourGuideDetails) {
//     return <div>Tour guide not found</div>;
//   }

//   const [formData, setFormData] = useState({
//     name: tourGuideDetails.name,
//     bio: tourGuideDetails.bio,
//     description: tourGuideDetails.description,
//     profilePicture: tourGuideDetails.profilePicture,
//     portfolio: tourGuideDetails.portfolio.map((item, index) => ({ ...item, id: index })),
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData(prevState => ({
//         ...prevState,
//         profilePicture: reader.result
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handlePortfolioChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPortfolio = files.map((file, index) => {
//       return { type: 'image', url: URL.createObjectURL(file), id: formData.portfolio.length + index };
//     });
//     setFormData(prevState => ({
//       ...prevState,
//       portfolio: [...prevState.portfolio, ...newPortfolio]
//     }));
//   };

//   const removePortfolioItem = (id) => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       portfolio: prevFormData.portfolio.filter(item => item.id !== id),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Save the formData to the backend
//     // navigate back to the profile page after saving
//     console.log(formData);
//     navigate(`/tour-guide/${tourGuideId}`);
//   };

//   return (
//     <div className="">
//       <div className="edit-tour-guide-profile-container">
//         <form onSubmit={handleSubmit} className="edit-tour-guide-profile-form">
//           <div className="profile-header">
//             <div className="profile-picture-container">
//               <img src={formData.profilePicture} alt={formData.name} className="profile-picture"/>
//               <label className="change-profile-picture-btn">
//                 <i className="fas fa-edit"></i>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleProfilePictureChange} 
//                   style={{ display: 'none' }}
//                 />
//               </label>
//             </div>
//             <div className="profile-info">
//               <h2>
//                 <input 
//                   type="text" 
//                   name="name" 
//                   value={formData.name} 
//                   onChange={handleChange} 
//                   className="form-control" 
//                 />
//               </h2>
//               <p className="bio">
//                 <textarea 
//                   name="bio" 
//                   value={formData.bio} 
//                   onChange={handleChange} 
//                   className="form-control"
//                 />
//               </p>
//             </div>
//           </div>
//           <div className="description-section">
//             <h3>Description</h3>
//             <textarea 
//               name="description" 
//               value={formData.description} 
//               onChange={handleChange} 
//               className="form-control"
//             />
//           </div>
//           <div className="portfolio-section">
//             <h3>Portfolio</h3>
//             <div className="portfolio-wrapper">
//               {formData.portfolio.map((item) => (
//                 <div key={item.id} className="portfolio-item">
//                   {item.type === 'image' ? (
//                     <img src={item.url} alt={`Portfolio item ${item.id}`} className="portfolio-image" />
//                   ) : (
//                     <video src={item.url} controls className="portfolio-video" />
//                   )}
//                   <button onClick={() => removePortfolioItem(item.id)}>Remove</button>
//                 </div>
//               ))}
//             </div>
//             <label className="btn btn-primary add-portfolio-btn">
//               <i className="fas fa-upload"></i> Add Portfolio Items
//               <input 
//                 type="file" 
//                 accept="image/*,video/*" 
//                 multiple 
//                 onChange={handlePortfolioChange} 
//                 style={{ display: 'none' }}
//               />
//             </label>
//           </div>
//           <div className="feedback-section">
//             <h3>Feedback</h3>
//             <div className="feedback-items">
//               {tourGuideDetails.feedback.map((feedback, index) => (
//                 <div key={index} className="feedback-item">
//                   <p className="rating">Rating: {feedback.stars} / 5</p>
//                   <p className="comment">{feedback.comment}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="bookings-section">
//             <h3>Bookings</h3>
//             {/* Implement bookings display as needed */}
//           </div>
//           <button type="submit" className="btn btn-primary">Save Changes</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditTourGuideProfile;
import React, { useState } from 'react';
import './EditTourGuideProfile.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function EditTourGuideProfile() {
  // Sample static data
  const sampleTourGuides = [
    {
      name: 'John Doe',
      bio: 'Experienced tour guide with a passion for history and culture.',
      description: 'I have been guiding tours for over 10 years and love sharing my knowledge with others.',
      profilePicture: 'https://via.placeholder.com/150',
      portfolio: [
        { type: 'image', url: 'https://via.placeholder.com/300/0000FF/808080' },
        { type: 'image', url: 'https://via.placeholder.com/300/FF0000/FFFFFF' },
        { type: 'image', url: 'https://via.placeholder.com/300/00FF00/000000' },
        { type: 'image', url: 'https://via.placeholder.com/300/FF00FF/FFFF00' },
        { type: 'image', url: 'https://via.placeholder.com/300/00FFFF/FF00FF' },
        { type: 'image', url: 'https://via.placeholder.com/300/FFFF00/00FFFF' },
        { type: 'image', url: 'https://via.placeholder.com/300/FFFFFF/FF0000' },
        { type: 'image', url: 'https://via.placeholder.com/300/000000/00FF00' },
        { type: 'image', url: 'https://via.placeholder.com/300/0000FF/FFFF00' },
        { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      ],
      feedback: [
        { stars: 5, comment: 'Great tour!' },
        { stars: 4, comment: 'Very informative.' },
        { stars: 3, comment: 'Good, but could be better.' },
        { stars: 5, comment: 'Amazing experience!' },
        { stars: 2, comment: 'Not what I expected.' },
        { stars: 4, comment: 'Really good guide.' },
        { stars: 5, comment: 'Best tour ever!' },
        { stars: 3, comment: 'It was okay.' },
        { stars: 4, comment: 'Pretty good tour.' },
        { stars: 5, comment: 'Loved it!' },
      ],
      bookings: [
        { date: '2024-06-01', client: 'Alice Johnson' },
        { date: '2024-06-02', client: 'Bob Smith' },
        { date: '2024-06-03', client: 'Carol White' },
        { date: '2024-06-04', client: 'Dave Brown' },
        { date: '2024-06-05', client: 'Eve Davis' },
        { date: '2024-06-06', client: 'Frank Harris' },
        { date: '2024-06-07', client: 'Grace Lee' },
        { date: '2024-06-08', client: 'Hank Miller' },
        { date: '2024-06-09', client: 'Ivy Wilson' },
        { date: '2024-06-10', client: 'Jack Taylor' },
      ],
    },
    // Additional tour guides if needed
  ];

  // Using the first tour guide as default
  const tourGuideDetails = sampleTourGuides[0];

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
  
  const calculateAverageRating = () => {
    // Calculate average rating overall
    const totalStars = tourGuideDetails.feedback.reduce((acc, feedback) => acc + feedback.stars, 0);
    const averageRating = totalStars / tourGuideDetails.feedback.length;
    return isNaN(averageRating) ? 0 : averageRating.toFixed(1);
  };

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
                  <button onClick={() => removePortfolioItem(item.id)}>
                    <i className="fas fa-times"></i>
                  </button>
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
            <h3>Feedback ({tourGuideDetails.feedback.length})</h3>
            <div className="average-rating">
              Average Rating: {renderStars(calculateAverageRating())}
            </div>
            <div className="feedback-container">
              <div className="feedback-items">
                {tourGuideDetails.feedback.map((feedback, index) => (
                  <div key={index} className="feedback-item">
                    <div className="user-info">
                      <img src={tourGuideDetails.profilePicture} alt={tourGuideDetails.name} className="profile-img" />
                      <p className="user-name">{tourGuideDetails.name}</p>
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
                ))}
              </div>
            </div>
          </div>


        </form>
      </div>
     
      <div className="bookings-section col-12 col-md-4">
        <h3 className="section-title">Upcoming Bookings</h3>
        <div className="bookings-list">
          {tourGuideDetails.bookings.map((booking, index) => (
            <div key={index} className="booking-item">
              <div className="booking-info">
                <p className="booking-date">{booking.date}</p>
                <p className="booking-client">Client: {booking.client}</p>
              </div>
              <div className="booking-actions">
                <button className="btn btn-cancel">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default EditTourGuideProfile;
