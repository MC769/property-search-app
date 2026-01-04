export const filterProperties = (properties, criteria) => {
  if (!criteria || Object.keys(criteria).length === 0) {
    return properties;
  }

  return properties.filter(property => {
    // Property Type filter
    if (criteria.type && criteria.type !== 'any' && property.type !== criteria.type) {
      return false;
    }

    // Price range filter
    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
      return false;
    }
    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
      return false;
    }

    // Bedrooms filter
    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
      return false;
    }
    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
      return false;
    }

    // Date added filter
    if (criteria.dateFrom) {
      const propertyDate = new Date(property.added.fullDate);
      const filterDate = new Date(criteria.dateFrom);
      if (propertyDate < filterDate) {
        return false;
      }
    }
    if (criteria.dateTo) {
      const propertyDate = new Date(property.added.fullDate);
      const filterDate = new Date(criteria.dateTo);
      if (propertyDate > filterDate) {
        return false;
      }
    }

    // Postcode filter
    if (criteria.postcode && !property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())) {
      return false;
    }

    return true;
  });
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};