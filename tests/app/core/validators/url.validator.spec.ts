import { FormControl } from '@angular/forms';

import { isValidUrl } from '@core/validators';

describe('isValidUrl', () => {
  const validUrls = [
    'http://www.example.com',
    'https://www.example.com',
    'ftp://example.com',
    'http://example.co.uk',
    'https://subdomain.example.com',
  ];

  validUrls.forEach((url) => {
    it(`should return null for valid URL: ${url}`, () => {
      const control = new FormControl(url);
      expect(isValidUrl(control)).toBeNull();
    });
  });

  const invalidUrls = [
    'httpwwwexamplecom',
    'example.com',
    'ftp:/example.com',
    'htp://example.com',
    'http://example com',
  ];

  invalidUrls.forEach((url) => {
    it(`should return an error object for invalid URL: ${url}`, () => {
      const control = new FormControl(url);
      expect(isValidUrl(control)).toEqual({ isValidUrl: false });
    });
  });
});
