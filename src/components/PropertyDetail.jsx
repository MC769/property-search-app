import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import PropertyTabs from './PropertyTabs';
import { formatPrice } from '../utils/searchUtils';

const PropertyDetail = ({ properties, favorites, onFavorite, onRemoveFavorite }) => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some(fav => fav.id === id)
  );

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(property.id);
    } else {
      onFavorite(property);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="property-detail">
      <div className="property-header">
        <Link to="/" className="btn-back">
          ← Back to Search
        </Link>
        <button 
          className={`btn-favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '★ Saved to Favorites' : '☆ Save Property'}
        </button>
      </div>

      <div className="property-overview">
        <h1>{property.bedrooms} Bedroom {property.type} for Sale</h1>
        <h2 className="property-price">{formatPrice(property.price)}</h2>
        <p className="property-address">{property.location}</p>
        
        <div className="property-quick-info">
          <div className="info-item">
            <span className="label">Type:</span>
            <span className="value">{property.type}</span>
          </div>
          <div className="info-item">
            <span className="label">Tenure:</span>
            <span className="value">{property.tenure}</span>
          </div>
          <div className="info-item">
            <span className="label">Bedrooms:</span>
            <span className="value">{property.bedrooms}</span>
          </div>
          <div className="info-item">
            <span className="label">Added:</span>
            <span className="value">{property.added.day} {property.added.month} {property.added.year}</span>
          </div>
        </div>
      </div>

      <ImageGallery images={property.pictures} />

      <PropertyTabs 
        description={property.description}
        floorPlan={property.floorPlan}
        coordinates={property.coordinates}
        location={property.location}
      />

      <div className="property-contact">
        <h3>Interested in this property?</h3>
        <div className="contact-actions">
          <button className="btn btn-primary btn-large">
            📞 Call Agent
          </button>
          <button className="btn btn-secondary btn-large">
            ✉️ Email Agent
          </button>
          <button 
            className={`btn ${isFavorite ? 'btn-secondary' : 'btn-primary'} btn-large`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;