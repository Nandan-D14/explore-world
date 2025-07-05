import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, searchResults, loading, filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search destinations, countries, or attractions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? '🔄' : '🔍'}
          </button>
        </div>
      </form>

      <div className="filter-section">
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters {showFilters ? '▲' : '▼'}
        </button>

        {showFilters && (
          <div className="filters-container">
            <div className="filter-group">
              <label>Genre:</label>
              <select 
                value={filters.genre || ''}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
              >
                <option value="">All Genres</option>
                <option value="Historical">Historical</option>
                <option value="Architecture">Architecture</option>
                <option value="Adventure">Adventure</option>
                <option value="Nature">Nature</option>
                <option value="Beach">Beach</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Country:</label>
              <select 
                value={filters.country || ''}
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                <option value="">All Countries</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Italy">Italy</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Rating:</label>
              <select 
                value={filters.rating || ''}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            <button 
              className="clear-filters"
              onClick={() => onFilterChange('clear', null)}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {searchResults && searchResults.length > 0 && (
        <div className="search-results-info">
          Found {searchResults.length} destination{searchResults.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
