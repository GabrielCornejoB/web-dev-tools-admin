import { FormControl, ValidationErrors } from '@angular/forms';

const urlPattern = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

/**
 * Custom URL Validator
 * @param control Required form control argument for Validator
 * @returns ValidationError if the URL is invalid or null if it's valid
 */
export const isValidUrl = (control: FormControl): ValidationErrors | null => {
  const value: string = control.value.trim().toLowerCase();

  if (!urlPattern.test(value)) {
    return { isValidUrl: false };
  }

  return null;
};
