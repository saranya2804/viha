import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onSearch, searchResults, searchTerm }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [typedSearchTerm, setTypedSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (event) => {
    setTypedSearchTerm(event.target.value);
    onSearch(event.target.value); // Trigger search on typing
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(typedSearchTerm); // Perform search on Enter press
      setIsSearchOpen(false); // Close the search bar
    }
  };

  const filteredSearchResults = searchResults.filter((product) =>
    product.name.toLowerCase().includes(typedSearchTerm.toLowerCase())
  );

  const closeSearchBar = () => {
    setIsSearchOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="https://viharrni.com/cdn/shop/files/viharrni_logo11-01.webp?v=1721024179" style={{ height: "50px", width: "170px" }}></img>
      </div>

      <div className="navbar-center">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#new-arrivals">New Arrivals</a>
        <a href="#blog">Blog</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
      </div>

      <div className="navbar-links">
        <span onClick={toggleSearchBar}>
          <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
        </span>
        <FontAwesomeIcon icon={faUser} className="navbar-icon" />
        <FontAwesomeIcon icon={faHeart} className="navbar-icon" />
        <FontAwesomeIcon icon={faShoppingCart} className="navbar-icon" />
      </div>

      {/* Search bar toggle and results */}
      {isSearchOpen && (
        <div className="slide-down-search">
          <button className="close-btn" onClick={closeSearchBar}>X</button>
          <p>Start typing and hit Enter</p>
          <input
            type="text"
            placeholder="Search for products..."
            value={typedSearchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <div className="search-results">
            {loading ? (
              <p>Loading...</p>
            ) : filteredSearchResults.length > 0 ? (
              filteredSearchResults.map((product) => (
                <div key={product.id} className="search-result-item">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <p>{product.description}</p>
                  <p className="price">Rs.{product.price}</p>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
