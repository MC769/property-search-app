import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: null,
    dateTo: null,
    postcode: ''
  });

  const propertyTypes = [
    { value: 'any', label: 'Any Type' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  const priceOptions = [
    { value: '', label: 'Any' },
    { value: '100000', label: '£100,000' },
    { value: '200000', label: '£200,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '750000', label: '£750,000' },
    { value: '1000000', label: '£1,000,000' },
    { value: '1500000', label: '£1,500,000' }
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const searchCriteria = {
      ...formData,
      dateFrom: formData.dateFrom ? formData.dateFrom.toISOString().split('T')[0] : null,
      dateTo: formData.dateTo ? formData.dateTo.toISOString().split('T')[0] : null
    };
    
    onSearch(searchCriteria);
  };

  const handleReset = () => {
    setFormData({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: null,
      dateTo: null,
      postcode: ''
    });
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-grid">
        {/* Property Type */}
        <div className="form-group">
          <label>Property Type</label>
          <select 
            name="type" 
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            {propertyTypes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="form-group">
          <label>Min Price</label>
          <select 
            name="minPrice" 
            value={formData.minPrice}
            onChange={handleChange}
            className="form-select"
          >
            {priceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Max Price</label>
          <select 
            name="maxPrice" 
            value={formData.maxPrice}
            onChange={handleChange}
            className="form-select"
          >
            {priceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="form-group">
          <label>Min Bedrooms</label>
          <select 
            name="minBedrooms" 
            value={formData.minBedrooms}
            onChange={handleChange}
            className="form-select"
          >
            {bedroomOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Max Bedrooms</label>
          <select 
            name="maxBedrooms" 
            value={formData.maxBedrooms}
            onChange={handleChange}
            className="form-select"
          >
            {bedroomOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Added */}
        <div className="form-group">
          <label>Added After</label>
          <DatePicker
            selected={formData.dateFrom}
            onChange={(date) => handleDateChange('dateFrom', date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Added Before</label>
          <DatePicker
            selected={formData.dateTo}
            onChange={(date) => handleDateChange('dateTo', date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            className="form-input"
          />
        </div>

        {/* Postcode */}
        <div className="form-group full-width">
          <label>Postcode Area (e.g., BR1, SE1)</label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="Enter postcode"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Search Properties
        </button>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={handleReset}
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
};

export default SearchForm;