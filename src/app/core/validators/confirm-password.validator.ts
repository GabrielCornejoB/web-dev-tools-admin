import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Custom e-mail validator
 * @param control Required form control argument for validator
 * @returns If the e-mail is valid or null
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
