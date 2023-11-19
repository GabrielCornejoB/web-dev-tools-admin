import { FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Function that returns custom error messages depending on the type of the ValidationError sent, if the ValidationError type is not defined in the function then it will return the default message "Invalid Field"
 * @param errors ValidationErrors from formControl or formGroup
 * @returns Error message depending on error type
 */
function getErrorMessages(errors: ValidationErrors): string {
  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `This field requires at least ${errors['minlength'].requiredLength} characters`;
      case 'maxlength':
        return `This field cannot be more than ${errors['maxlength'].requiredLength} characters`;
      case 'isValidEmail':
        return 'This field must be a valid email';
      case 'arePasswordsEqual':
        return 'The passwords must match';
      case 'correctPassword':
        return 'Incorrect password';
      case 'tooManyAttempts':
        return 'Too many login attempts, please try again later';
      case 'unknownFbError':
        return 'Unknown error :c';
    }
  }
  return 'Invalid Field';
}

/**
 * Function that returns the error message from a Form Control
 * @param fg Form Group reference
 * @param field Field's name from Form Group
 * @returns Error message or null
 */
function getErrorFromField(fg: FormGroup, field: string): string | null {
  if (!fg.controls[field]) return null;
  const errors = fg.controls[field].errors;

  if (!errors) return null;
  return getErrorMessages(errors);
}

/**
 * Function that return the error message from a Form
 * @param fg Form Group reference
 * @returns Error message from Form
 */
function getErrorFromForm(fg: FormGroup): string | null {
  if (!fg.errors) return null;
  const errors = fg.errors;

  return getErrorMessages(errors);
}

/**
 * Function that checks if the field has errors & is touched so the errors get printed
 * thought to be used in an *ngIf clause
 * @param fg Form Group reference
 * @param field Field's name from Form Group
 * @returns If the field is valid or null
 */
function canPrintError(fg: FormGroup, field: string): boolean | null {
  return fg.controls[field].errors && fg.controls[field].touched;
}

export { getErrorFromField, getErrorFromForm, canPrintError, getErrorMessages };
