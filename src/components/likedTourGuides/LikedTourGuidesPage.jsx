// // src/components/likedTourGuides/LikedTourGuidesPage.jsx

// import React from 'react';
import { Link } from 'react-router-dom';
import tourGuides from '../../data/tourGuides';

// const LikedTourGuidesPage = ({ likedGuides }) => {
//   // Filter the full list of tour guides to only include those that are liked
//   const likedTourGuides = tourGuides.filter(guide => likedGuides.includes(guide.id));

//   return (
//     <div>
//       <h1>Liked Tour Guides</h1>
//       {likedTourGuides.map(guide => (
//         <div key={guide.id}>
//           <h2>{guide.name}</h2>
//           <p>{guide.location}</p>
//           {/* Add more details as needed */}
//           <Link to={`/tour-guide/${guide.name.toLowerCase().replace(/\s+/g, '-')}`}>View Profile</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LikedTourGuidesPage;


import React from 'react';

const LikedTourGuidesPage = ({ likedGuides }) => {
  // Mock function to fetch guide details by ID. Replace this with your actual logic.
  const fetchGuideDetailsById = (id) => {
    // Assuming you have a function or way to get the guide details by ID.
    // This could involve filtering a list of all guides by the ID.
    // For demonstration, returning a mock object:
    return {
      id,
      name: `Guide Name ${id}`,
      bio: `Bio for Guide ${id}`,
    };
  };

  return (
    <div>
      <h1>Liked Tour Guides</h1>
      <ul>
        {likedGuides.map(guideId => {
          const guideDetails = fetchGuideDetailsById(guideId);
          return (
            <li key={guideId}>
              {guideDetails.name} - {guideDetails.bio}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LikedTourGuidesPage;
