import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/searchUtils';

const PropertyList = ({ properties, onFavorite, favorites }) => {
  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <div className="no-results">
          <p>No properties found matching your criteria.</p>
          <p>Try adjusting your search filters.</p>
        </div>
      ) : (
        properties.map((property, index) => (
            <div 
                key={property.id} 
                className="property-card"
                style={{ '--index': index }} 
            >
            <div className="property-image">
              <img 
                src={property.thumbnail} 
                alt={property.type}
                loading="lazy"
              />
              <div className="property-type">{property.type}</div>
              <button 
                className={`favorite-btn ${isFavorite(property.id) ? 'active' : ''}`}
                onClick={() => isFavorite(property.id) ? null : onFavorite(property)}
                title={isFavorite(property.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(property.id) ? '★' : '☆'}
              </button>
            </div>
            
            <div className="property-info">
              <h3>
                <Link to={`/property/${property.id}`}>
                  {property.bedrooms} Bedroom {property.type} for Sale
                </Link>
              </h3>
              <p className="property-price">{formatPrice(property.price)}</p>
              <p className="property-location">{property.location}</p>
              <p className="property-description">
                {property.description.substring(0, 120)}...
              </p>
              
              <div className="property-meta">
                <span>🛏️ {property.bedrooms} bed</span>
                <span>📅 Added: {property.added.day} {property.added.month} {property.added.year}</span>
                <span>📍 {property.postcode}</span>
              </div>
              
              <div className="property-actions">
                <Link to={`/property/${property.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;