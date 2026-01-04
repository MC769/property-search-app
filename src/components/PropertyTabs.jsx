import React, { useState } from 'react';

const PropertyTabs = ({ description, floorPlan, coordinates, location }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'floorplan', label: 'Floor Plan' },
    { id: 'location', label: 'Location' },
    { id: 'features', label: 'Key Features' }
  ];

  const googleMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="property-tabs">
      <div className="tabs-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tabs-content">
        {activeTab === 'description' && (
          <div className="tab-pane">
            <h3>Property Description</h3>
            <div className="description">
              <p>{description}</p>
            </div>
          </div>
        )}

        {activeTab === 'floorplan' && (
          <div className="tab-pane">
            <h3>Floor Plan</h3>
            <div className="floorplan">
              <img 
                src={floorPlan} 
                alt="Property floor plan" 
                className="floorplan-image"
              />
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="tab-pane">
            <h3>Location & Map</h3>
            <div className="map-container">
              <iframe
                title="Property location map"
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={googleMapsUrl}
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
            <div className="location-info">
              <h4>Local Amenities:</h4>
              <ul>
                <li>🚆 Transport: 5 min walk to station</li>
                <li>🛒 Shopping: Local shops 10 min walk</li>
                <li>🏫 Schools: Good local schools</li>
                <li>🌳 Parks: Park nearby</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="tab-pane">
            <h3>Key Features</h3>
            <div className="features-grid">
              <div className="feature">
                <strong>Property Type:</strong>
                <span>Residential</span>
              </div>
              <div className="feature">
                <strong>Tenure:</strong>
                <span>Freehold</span>
              </div>
              <div className="feature">
                <strong>Council Tax:</strong>
                <span>Band D</span>
              </div>
              <div className="feature">
                <strong>EPC Rating:</strong>
                <span>B (82)</span>
              </div>
              <div className="feature">
                <strong>Year Built:</strong>
                <span>2015</span>
              </div>
              <div className="feature">
                <strong>Heating:</strong>
                <span>Gas Central</span>
              </div>
              <div className="feature">
                <strong>Parking:</strong>
                <span>Driveway</span>
              </div>
              <div className="feature">
                <strong>Garden:</strong>
                <span>Private Rear</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyTabs;