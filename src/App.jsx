import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import { properties } from './utils/propertyData';
import { filterProperties } from './utils/searchUtils';
import './styles/App.css';

function App() {
  const [searchResults, setSearchResults] = useState(properties);
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('propertyFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (criteria) => {
    const results = filterProperties(properties, criteria);
    setSearchResults(results);
    
    if (Object.keys(criteria).length > 0) {
      showNotification(`Found ${results.length} properties matching your search`, 'info');
    }
  };

  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
      showNotification(`Added "${property.type}" to favorites!`, 'success');
    }
  };

  const removeFromFavorites = (propertyId) => {
    const property = favorites.find(fav => fav.id === propertyId);
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
    showNotification(`Removed "${property?.type}" from favorites`, 'info');
  };

  const clearFavorites = () => {
    setFavorites([]);
    showNotification('Cleared all favorites', 'info');
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Helper function
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Router>
      <div className="app">
        {/* Notification */}
        {notification && (
          <div className={`notification ${notification.type} show`}>
            <div className="notification-content">
              <strong>{notification.type === 'success' ? '✓ ' : 'ℹ '}</strong>
              {notification.message}
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button 
          className="fab"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Scroll to top"
        >
          ↑
        </button>

        <header className="app-header">
          <div className="container">
            <Link to="/" className="logo">
              <h1>PropertyFind</h1>
              <p>Find your dream property</p>
            </Link>
            <nav>
              <Link to="/">🔍 Search</Link>
              <Link to="/favorites">
                ⭐ Favorites ({favorites.length})
              </Link>
            </nav>
          </div>
        </header>

        <main className="container main-content">
          <Routes>
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <div className="hero-section">
                  <div className="hero-content">
                    <h1>Find Your Perfect Home</h1>
                    <p>Search thousands of properties for sale and rent across the UK</p>
                    <div className="hero-stats">
                      <div className="stat">
                        <span className="stat-number">7,000+</span>
                        <span className="stat-label">Properties</span>
                      </div>
                      <div className="stat">
                        <span className="stat-number">150+</span>
                        <span className="stat-label">Areas</span>
                      </div>
                      <div className="stat">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">Updated</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="search-section">
                  <h2>Search Properties</h2>
                  <p className="search-subtitle">Find your dream home with our advanced search tools</p>
                  <SearchForm onSearch={handleSearch} />
                </div>
                
                <div className="content-wrapper">
                  <div className="results-container">
                    <div className="results-header">
                      <h3>
                        {searchResults.length} Property{searchResults.length !== 1 ? 's' : ''} Found
                      </h3>
                      <div className="sort-options">
                        <select className="sort-select">
                          <option>Sort by: Recommended</option>
                          <option>Price: Low to High</option>
                          <option>Price: High to Low</option>
                          <option>Newest First</option>
                          <option>Bedrooms: Most First</option>
                        </select>
                      </div>
                    </div>
                    
                    {searchResults.length === 0 ? (
                      <div className="no-results">
                        <div className="no-results-icon">🏠</div>
                        <h3>No properties found</h3>
                        <p>Try adjusting your search criteria</p>
                      </div>
                    ) : (
                      <PropertyList 
                        properties={searchResults}
                        onFavorite={addToFavorites}
                        favorites={favorites}
                      />
                    )}
                  </div>
                  
                  <div className="favorites-sidebar">
                    <div className="favorites-header">
                      <h3>My Favorites ({favorites.length})</h3>
                      {favorites.length > 0 && (
                        <button 
                          className="btn-clear"
                          onClick={clearFavorites}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    
                    {favorites.length === 0 ? (
                      <div className="favorites-empty">
                        <div className="empty-icon">⭐</div>
                        <h4>No favorites yet</h4>
                        <p>Click the star icon to add properties</p>
                      </div>
                    ) : (
                      <div className="favorites-list">
                        {favorites.map(property => (
                          <div key={property.id} className="favorite-item">
                            <img 
                              src={property.thumbnail} 
                              alt={property.type}
                              className="favorite-img"
                            />
                            <div className="favorite-info">
                              <h4>
                                <Link to={`/property/${property.id}`}>
                                  {property.bedrooms} Bed {property.type}
                                </Link>
                              </h4>
                              <p className="price">{formatPrice(property.price)}</p>
                              <button
                                className="btn-remove"
                                onClick={() => removeFromFavorites(property.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            } />
            
            <Route path="/property/:id" element={
              <PropertyDetail 
                properties={properties}
                favorites={favorites}
                onFavorite={addToFavorites}
                onRemoveFavorite={removeFromFavorites}
              />
            } />
            
            <Route path="/favorites" element={
              <div className="favorites-page">
                <div className="page-header">
                  <h2>⭐ My Favorite Properties</h2>
                  {favorites.length > 0 && (
                    <button 
                      className="btn btn-secondary"
                      onClick={clearFavorites}
                    >
                      Clear All Favorites
                    </button>
                  )}
                </div>
                {favorites.length === 0 ? (
                  <div className="no-favorites">
                    <div className="empty-state">
                      <div className="empty-icon">⭐</div>
                      <h3>No favorites yet</h3>
                      <p>You haven't added any properties to favorites yet.</p>
                      <Link to="/" className="btn btn-primary">
                        Browse Properties
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="favorites-grid">
                    {favorites.map(property => (
                      <div key={property.id} className="favorite-card hover-lift">
                        <div className="property-image">
                          <img src={property.thumbnail} alt={property.type} />
                          <div className="property-type">{property.type}</div>
                        </div>
                        <div className="favorite-content">
                          <h3>{property.bedrooms} Bed {property.type}</h3>
                          <p className="price-tag">{formatPrice(property.price)}</p>
                          <p className="location">{property.location}</p>
                          <div className="features-grid">
                            <div className="feature-item">🛏️ {property.bedrooms} beds</div>
                            <div className="feature-item">📍 {property.postcode}</div>
                          </div>
                          <div className="favorite-actions">
                            <Link 
                              to={`/property/${property.id}`}
                              className="btn btn-primary"
                            >
                              View Details
                            </Link>
                            <button
                              className="btn btn-secondary"
                              onClick={() => removeFromFavorites(property.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            } />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                <h3>PropertyFind</h3>
                <p>Your journey to the perfect home starts here</p>
              </div>
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Quick Links</h4>
                  <Link to="/">Home</Link>
                  <Link to="/">Search Properties</Link>
                  <Link to="/favorites">My Favorites</Link>
                </div>
                <div className="footer-column">
                  <h4>Contact Us</h4>
                  <p>📧 info@propertyfind.com</p>
                  <p>📞 0800 123 4567</p>
                  <p>📍 London, UK</p>
                </div>
              </div>
            </div>
            <p>&copy; 2026 PropertyFind. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;