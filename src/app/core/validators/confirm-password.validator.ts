import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Custom Confirm password validator, checks if both fields are equal
 * @param control Required form control argument for validator
 * @returns If both fields match or null
 */
export const confirmPassword = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { arePasswordsEqual: false };
  }

  return null;
};
