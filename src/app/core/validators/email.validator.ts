import { FormControl, ValidationErrors } from '@angular/forms';

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * Custom e-mail validator
 * @param control Required form control argument for validator
 * @returns ValidationError if the email is invalid or null if the email is valid
 */
export const validEmail = (control: FormControl): ValidationErrors | null => {
  const value: string = control.value.trim().toLowerCase();

  if (!emailPattern.test(value)) {
    return { isValidEmail: false };
  }

  return null;
};
