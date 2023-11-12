import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Custom Confirm password validator, checks if both fields are equal
 * @param control Required form control argument for validator
 * @returns ValidationError if passwords are not equal or null if they are
 */
export const confirmPassword = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value) {
    return { arePasswordsEqual: false };
  }

  return null;
};
