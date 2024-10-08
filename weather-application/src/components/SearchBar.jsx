import React, { useState, useEffect } from "react";
import { getCitySuggestions } from "../api/weatherApi";

const SearchBar = ({ onSearch }) => {
  // managing states
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // UseEffect to handle the cities suggestion
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 1) {
        const results = await getCitySuggestions(searchTerm);
        setSuggestions(results);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  // Submit button to fetch the data of that particular city
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm);
      setShowDropdown(false);
    }
  };

  // Or user can fetch the city data directly by clicking the suggestion
  const handleSuggestionClick = (city) => {
    setSearchTerm(`${city.name}, ${city.country}`);
    setShowDropdown(false);
    onSearch(`${city.name}, ${city.country}`);
  };

  return (
    <>
      <div className="search-main2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Location"
          className="tapSearch"
        />
        <input type="submit" className="submitBtn" onClick={handleSubmit} />
        {showDropdown && suggestions.length > 0 && (
          <ul className="autocomplete-dropdown">
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => handleSuggestionClick(city)}>
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
