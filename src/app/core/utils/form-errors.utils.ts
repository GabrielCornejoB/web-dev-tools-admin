import { FormGroup, ValidationErrors } from '@angular/forms';

import { FORM_ERROR_MESSAGES } from '@core/constants';

/**
 * Function that returns custom error messages depending on the type of the ValidationError sent, if the ValidationError type is not defined in the function then it will return the default message "Invalid Field"
 * @param errors ValidationErrors from formControl or formGroup
 * @returns Error message depending on error type
 */
function getErrorMessages(errors: ValidationErrors): string {
  const errorKey = Object.keys(errors)[0];

  if (errorKey === 'minlength')
    return `This field requires at least ${errors['minlength'].requiredLength} chars`;
  if (errorKey === 'maxlength')
    return `This field cannot be more than ${errors['maxlength'].requiredLength} chars`;

  return FORM_ERROR_MESSAGES[errorKey] ?? 'Invalid field';
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
