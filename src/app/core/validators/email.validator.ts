import { FormControl, ValidationErrors } from '@angular/forms';

const emailPatterm = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * Custom e-mail validator
 * @param control Required form control argument for validator
 * @returns If the e-mail is valid or null
 */
export const validEmail = (control: FormControl): ValidationErrors | null => {
  const value: string = control.value.trim().toLowerCase();
  console.log(emailPatterm.test(value));

  if (!emailPatterm.test(value)) {
    return { isInvalidEmail: true };
  }

  return null;
};
