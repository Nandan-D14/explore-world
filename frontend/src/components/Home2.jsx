import React, { useState, useEffect } from 'react';
import "../styles/home2.css";
import "../styles/loading.css";
import Card from '../components/content/Card.jsx';
import { Link, useNavigate } from "react-router-dom";
import Footer from "./content/Footer.jsx";
import FeedbackForm from './content/FeedbackForm.jsx';

function Home() {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        console.log('Fetching from:', `${apiUrl}/places`);
        const response = await fetch(`${apiUrl}/places`);
        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }
        const data = await response.json();
        setSearchData(data);
        setError(null);
        console.log('Fetched data:', data);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to load places. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleCardClick = (place) => {
    navigate(`/places/${place.placeName}`, {
      state: { placeData: place },
    });
  };

  const renderHeader = () => (
    <div className="home-front-img-container">
      <img src="https://wallpaperaccess.com/full/1431622.jpg" alt="Travel Banner" />
      <div className="search-container">
        <div className="show-text-container">
          <h6>EXPLORE WORLD</h6>
          <h1>Unveiling Wonders, Crafting Memories</h1>
        </div>
        <div className="show-img-continer">
          <div className="in-main-img-home2">
            <img src="https://img.freepik.com/premium-photo/festival-colors-india-celebration-spring-holiday-holi_124507-100644.jpg" alt="" />
          </div>
          <div className="in-main-img-home2">
            <img src="https://4kwallpapers.com/images/wallpapers/lantern-festival-chinese-new-year-china-lanterns-night-5k-2048x2048-4772.jpg" alt="" />
          </div>
          <div className="in-main-img-home2">
            <img src="https://img.freepik.com/premium-photo/fireworks-festival-hd-8k-wallpaper-stock-photographic-image_915071-82737.jpg" alt=""/>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <div id="home-container">
          {renderHeader()}
          <div className="status-message">
            <div className="loading-spinner"></div>
            <h2>Loading amazing destinations...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div id="home-container">
          {renderHeader()}
          <div className="status-message">
            <p className="error-message">{error}</p>
            <button onClick={() => window.location.reload()} className="cta-button">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div id="home-container">
        {renderHeader()}
        <h1 className="top-destination-title">All Destinations ({searchData.length} countries found)</h1>
        <div className="top-destination-container">
          {searchData.length === 0 ? (
            <div className="status-message">
              <p>No destinations found. Check console for errors.</p>
            </div>
          ) : (
            searchData.map((country) =>
              country.states?.map((state) =>
                state.places?.map((place) => (
                  <Card
                    key={place._id || `${country.countryName}-${state.stateName}-${place.placeName}`}
                    destination={place.placeName}
                    genuse={place.genuse}
                    info={`${state.stateName}, ${country.countryName}`}
                    image={place.image1}
                    onClick={() => handleCardClick(place)}
                    myfavdata={{
                      placeName: place.placeName,
                      genuse: place.genuse,
                      image1: place.image1,
                      countryName: country.countryName,
                      stateName: state.stateName,
                    }}
                  />
                ))
              )
            )
          )}
        </div>

        <div className="testimonials-container">
          <h2>What Our Customers Say</h2>
          <p>"Amazing experience! Will definitely book again!" - Jane Doe</p>
          <p>"The best vacation ever!" - John Smith</p>
        </div>
        <div className="cta-container">
          <h2>You want to see more?</h2>
          <Link to="/blogs">
            <button className="cta-button"> GO !</button>
          </Link>
        </div>
        <FeedbackForm />
      </div>
      <Footer />
    </>
  );
}

export default Home;
