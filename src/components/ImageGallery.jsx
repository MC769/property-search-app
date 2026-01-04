import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img 
          src={images[selectedImage]} 
          alt={`Property view ${selectedImage + 1}`}
          className="gallery-image"
        />
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
        </div>
        
        <div className="gallery-controls">
          <button 
            className="gallery-btn prev"
            onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            className="gallery-btn next"
            onClick={() => setSelectedImage(prev => (prev + 1) % images.length)}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="thumbnail-grid">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail-btn ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;