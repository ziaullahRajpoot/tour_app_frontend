// src/data/tourGuides.js

import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';



const tourGuides = [
  {
    id: 1,
    profilePicture: image1,
    name: "John Doe",
    location: "New York",
    languages: ["English", "Spanish"],
    imageUrls: [image1, image2],
    bio: "Short biography of John Doe.",
    description: "Detailed description of John Doe's tours and experience.",
    portfolio: [
      { type: 'image', url: 'path/to/portfolio1.jpg' },
      { type: 'image', url: 'path/to/portfolio2.jpg' }
    ],
    feedback: [
      { stars: 5, comment: "Great experience!" },
      { stars: 4, comment: "Very knowledgeable." }
    ]
  },
  {
    id: 2,
    profilePicture: image1,
    name: "John abcd",
    location: "New York",
    languages: ["English", "Spanish"],
    imageUrls: [image1, image2],
    bio: "Short  of John Doe.",
    description: "Detailed description of John Doe's tours and experience.",
    portfolio: [
      { type: 'image', url: image1 },
      { type: 'image', url: image2 }
    ],
    feedback: [
      { stars: 5, comment: "Great experience!" },
      { stars: 4, comment: "Very knowledgeable." }
    ]
  },
  // More tour guides...
];

export default tourGuides;