import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { formatPrice } from '../utils/searchUtils';

const FavoritesList = ({ favorites, onRemove, onClear, showClearButton = false }) => {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <p>No favorite properties yet.</p>
        <p>Drag properties here or click the star icon.</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <h3>My Favorites ({favorites.length})</h3>
        {showClearButton && (
          <button 
            className="btn-clear-favorites"
            onClick={onClear}
            aria-label="Clear all favorites"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="favorites-scroll">
        {favorites.map((property, index) => (
          <Draggable key={property.id} draggableId={property.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`favorite-item ${snapshot.isDragging ? 'dragging' : ''}`}
              >
                <div className="favorite-image">
                  <img 
                    src={property.thumbnail} 
                    alt={property.description.substring(0, 50)} 
                  />
                </div>
                <div className="favorite-info">
                  <h4>
                    <Link to={`/property/${property.id}`}>
                      {property.bedrooms} Bed {property.type}
                    </Link>
                  </h4>
                  <p className="favorite-price">{formatPrice(property.price)}</p>
                  <p className="favorite-location">{property.location}</p>
                </div>
                <button
                  className="btn-remove-favorite"
                  onClick={() => onRemove(property.id)}
                  aria-label={`Remove ${property.type} from favorites`}
                >
                  ×
                </button>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;