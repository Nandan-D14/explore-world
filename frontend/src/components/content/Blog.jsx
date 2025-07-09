import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from './Card.jsx';
import '../../styles/blogs.css';
import Footer from './Footer.jsx';
import Loader from './Loder.jsx';

const Blogs = () => {
  const [searchData, setSearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [values, setValues] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        console.log('Blog - Fetching from:', `${apiUrl}/places`);
        const response = await fetch(`${apiUrl}/places`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSearchData(data);
        setFilteredData(data);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching places:", error);
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

  return !loading ? (<Loader/>):(
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
        {filteredData.map((country) =>
          country.states.map((state) =>
            state.places.map((place) => (
              <Card
                key={place._id}
                destination={place.placeName}
                genuse={place.genuse}
                info={`${state.stateName}, ${country.countryName}`}
                image={place.image1}
                myfavdata={place}
                onClick={() => handleCardClick(place)}
              />
            ))
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
