import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await axios.get(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch profile');
      }
    };

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await axios.get(`${apiUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
      } catch (error) {
        setError('Failed to fetch favorites');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchFavorites()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user && (
        <div className="profile-info">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
      <h2>My Favorites</h2>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav._id} className="favorite-card">
              <img src={fav.image1} alt={fav.placeName} />
              <h3>{fav.placeName}</h3>
              <p>
                {fav.stateName}, {fav.countryName}
              </p>
            </div>
          ))
        ) : (
          <p>You have no favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
