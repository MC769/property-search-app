import { filterProperties, formatPrice, formatDate } from '../utils/searchUtils';
import { properties } from '../utils/propertyData';

describe('Search Utilities', () => {
  describe('filterProperties', () => {
    test('filters by property type', () => {
      const criteria = { type: 'House' };
      const result = filterProperties(properties, criteria);
      expect(result.every(p => p.type === 'House')).toBe(true);
    });

    test('filters by price range', () => {
      const criteria = { minPrice: 400000, maxPrice: 800000 };
      const result = filterProperties(properties, criteria);
      expect(result.every(p => p.price >= 400000 && p.price <= 800000)).toBe(true);
    });

    test('filters by bedrooms', () => {
      const criteria = { minBedrooms: 3 };
      const result = filterProperties(properties, criteria);
      expect(result.every(p => p.bedrooms >= 3)).toBe(true);
    });

    test('filters by postcode', () => {
      const criteria = { postcode: 'BR5' };
      const result = filterProperties(properties, criteria);
      expect(result.every(p => p.postcode.startsWith('BR5'))).toBe(true);
    });

    test('returns all properties when no criteria provided', () => {
      const result = filterProperties(properties, {});
      expect(result.length).toBe(properties.length);
    });
  });

  describe('formatPrice', () => {
    test('formats price correctly', () => {
      expect(formatPrice(750000)).toBe('£750,000');
      expect(formatPrice(399995)).toBe('£399,995');
    });

    test('handles zero price', () => {
      expect(formatPrice(0)).toBe('£0');
    });
  });

  describe('formatDate', () => {
    test('formats date string correctly', () => {
      expect(formatDate('2022-10-12')).toContain('12 October 2022');
    });
  });
});