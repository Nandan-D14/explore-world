import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from './Card.jsx';
import '../../styles/blogs.css';
import Footer from './Footer.jsx';
import Loader from './Loder.jsx';
import { placesAPI } from '../../utils/api';

const Blogs = () => {
  const [searchData, setSearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [values, setValues] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Blog - Fetching places using placesAPI...');
        
        const response = await placesAPI.getAllPlaces();
        const data = response.data;
        
        setSearchData(data);
        setFilteredData(data);
        console.log('Blog - Fetched data:', data);
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (value === "") {
      setFilteredData(searchData);
      setValues(false);
      return;
    }

    const filtered = searchData.filter((country) => {
      const countryMatches = country.countryName.toLowerCase().startsWith(value.toLowerCase());

      const statesMatching = country.states.filter((state) => {
        const stateMatches = state.stateName.toLowerCase().startsWith(value.toLowerCase());

        const placesMatching = state.places.filter((place) =>
          place.placeName.toLowerCase().startsWith(value.toLowerCase())
        );
        if (placesMatching.length > 0) {
          state.places = placesMatching;
        }
        return stateMatches || placesMatching.length > 0;
      });

      if (statesMatching.length > 0) {
        country.states = statesMatching;
      }
      return countryMatches || statesMatching.length > 0;
    });

    setFilteredData(filtered);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="outer">
        <div className="search-blog-container">
          <div style={{padding: '50px', textAlign: 'center'}}>
            <p style={{color: 'red', fontSize: '18px'}}>{error}</p>
            <button onClick={() => window.location.reload()} style={{padding: '10px 20px', fontSize: '16px'}}>
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="outer">
      <div className="search-blog-container">
        <input
          type="search"
          id="search"
          value={searchValue}
          onChange={handleSearch}
          placeholder=" Search for a place, state, or country"
        />
        <div>
          {!values && <h3>Searched for <i>{searchValue}</i> </h3>}
        </div>
      </div>

      <div className="container">
        {filteredData.length === 0 ? (
          <div style={{padding: '20px', textAlign: 'center'}}>
            <p>No destinations found. Check console for errors.</p>
          </div>
        ) : (
          filteredData.map((country) =>
            country.states?.map((state) =>
              state.places?.map((place) => (
                <Card
                  key={place._id || `${country.countryName}-${state.stateName}-${place.placeName}`}
                  destination={place.placeName}
                  genuse={place.genuse}
                  info={`${state.stateName}, ${country.countryName}`}
                  image={place.image1}
                  myfavdata={place}
                  onClick={() => handleCardClick(place)}
                />
              ))
            )
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
