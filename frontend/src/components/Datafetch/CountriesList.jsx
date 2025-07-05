import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function CountriesList(props) {

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/countries")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={styles.loadingText}>Loading...</p>;

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSearch = async (searchedWord) => {

    const searchTerm = searchedWord != null ? searchedWord : value;

    setValue(searchTerm);
    try {
      const response = await fetch(`http://localhost:4000/search?q=${searchTerm}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      navigate(`/searchpage/search?q=${searchTerm}`, { state: { searchData: data } });
    } catch (error) {
      alert("Not found");
      console.error("Error during search:", error);
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          value={value}
          onChange={onChangeInput}
          placeholder="Search countries"
          style={styles.input}
        />
        <button onClick={() => onSearch(value)} style={styles.button}>
          Search
        </button>
      </div>
      <div style={styles.dropdown}>
        {countries
          .filter((item) => {
            return (
              value &&
              item.Name.toLowerCase().startsWith(value.toLowerCase()) &&
              item.Name.toLowerCase() !== value.toLowerCase()
            );
          })
          .map((country) => (
            <div
              key={country._id}
              onClick={() => onSearch(country.Name)}
              onMouseEnter={() => setHoveredItem(country._id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                ...styles.dropdownItem,
                ...(hoveredItem === country._id ? styles.hoveredDropdownItem : {}),
              }}
            >
              {country.Name}{', '}{country.Code}
            </div>

          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    margin: '0 auto', fontSize: '23px', letterSpacing: '2px',
    backgroundColor: 'none',
    borderRadius: '10px', color: '#000000',
  },
  searchContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    height: '40px',
    border: 'none',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(240, 255, 255, 0.752)', color: '#000000', paddingLeft: '40px',
    borderRadius: '5px',
    outline: 'none', fontSize: '25px', letterSpacing: '2px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: '10px',
    borderRadius: '5px',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    zIndex: 9999,

  },
  dropdownItem: {
    padding: '10px',
    transition: 'background-color 0.2s',
    cursor: 'pointer', backgroundColor: 'rgba(240, 255, 255, 0.752)', paddingLeft: '40px',
  },
  hoveredDropdownItem: {
    backgroundColor: '#d3eaf5'
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666666',
  },
};

export default CountriesList;
