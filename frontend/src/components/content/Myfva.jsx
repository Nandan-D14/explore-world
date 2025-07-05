import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:4000/favorites", {
          params: { userId: "currentUserId" } 
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <div className="cards-container">
        {favorites.map((fav, index) => (
          <Card
            key={index}
            destination={fav.destination}
            genuse={fav.genuse}
            info={fav.info}
            image={fav.image}
            onClick={() => console.log(`Clicked: ${fav.destination}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
