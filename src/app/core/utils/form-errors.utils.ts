import { FormGroup, ValidationErrors } from '@angular/forms';

function getErrorMessages(errors: ValidationErrors): string {
  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `This field requires at least ${errors['minlength'].requiredLength} characters`;
      case 'maxlength':
        return `This field cannot be more than ${errors['maxlength'].requiredLength} characters`;
      case 'isInvalidEmail':
        return 'This field must be a valid email';
    }
  }
  return 'Invalid Field';
}

/**
 *
 * @param fg Form Group reference
 * @param field Field's name from Form Group
 * @returns Error message or null
 */
function getErrorFromField(fg: FormGroup, field: string): string | null {
  if (!fg.controls[field]) return null;
  const errors = fg.controls[field].errors || {};

  return getErrorMessages(errors);
}

/**
 *
 * @param fg Form Group reference
 * @param field Field's name from Form Group
 * @returns If the field is valid or null
 */
function isValidField(fg: FormGroup, field: string): boolean | null {
  return fg.controls[field].errors && fg.controls[field].touched;
}

export { getErrorFromField, isValidField };
