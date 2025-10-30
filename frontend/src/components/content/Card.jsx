import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/contentStyle/card.css';

const Card = ({ destination, genuse, info, image, onClick, myfavdata }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeart = async (event) => {
    event.stopPropagation();
    const newFav = !isFavorite;
    setIsFavorite(newFav);

    const updatedFavData = {
      ...myfavdata,
      isFavorite: newFav,
    };

    try {
      const response = await axios.post('http://localhost:4000/favorites', updatedFavData);
      console.log('Favorite added:', response.data);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  return (
    <div className="card-container" onClick={onClick}>
      <div className="svg">
        <svg
          className="w-[43px] h-[43px] text-gray-800 dark:text-white"
          onClick={handleHeart}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill={isFavorite ? 'red' : 'none'} 
          viewBox="0 0 24 24"
        >
          <path
            stroke={isFavorite ? 'red' : 'currentColor'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
      </div>

      <img
        alt={`img of ${destination} - ${genuse}`}
        className="card-img"
        height="300"
        src={image}
        width="400"
      />
      <div className="card-info">
        <h5 className="card-destiny-name">{destination}</h5>
        <h6>{info}</h6>
        <p className="card-discription">{genuse}</p>
      </div>
    </div>
  );
};

export default Card;
