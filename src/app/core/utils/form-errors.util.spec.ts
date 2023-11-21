import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getErrorFromField,
  getErrorFromForm,
  getErrorMessages,
} from './form-errors.utils';

describe('FormErrors - Utils', () => {
  describe('getErrorMessages()', () => {
    it('should return "Invalid Field" when an unknown error is sent', () => {
      const unknownError = { notValidErrorMessage: true };
      const unknownError2 = { whatIsThis: false };
      const unknownError3 = { johnDoe: null };

      const result = getErrorMessages(unknownError);
      const result2 = getErrorMessages(unknownError2);
      const result3 = getErrorMessages(unknownError3);

      expect(result).toEqual('Invalid Field');
      expect(result2).toEqual('Invalid Field');
      expect(result3).toEqual('Invalid Field');
    });

    it('should return "This field is required" when the error is of type "required"', () => {
      const validationError = { required: false };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('This field is required');
    });

    it('should return "This field requires at least..." when the error is of type "minlength"', () => {
      const validationError = { minlength: { requiredLength: 5 } };

      const result = getErrorMessages(validationError);

      expect(result).toContain('This field requires at least');
    });

    it('should return "This field cannot be more than..." when the error is of type "maxlength"', () => {
      const validationError = { maxlength: { requiredLength: 20 } };

      const result = getErrorMessages(validationError);

      expect(result).toContain('This field cannot be more than');
    });

    it('should return "This field must be a valid email" when the error is of type "isValidEmail"', () => {
      const validationError = { isValidEmail: false };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('This field must be a valid email');
    });

    it('should return "The passwords must match" when the error is of type "arePasswordsEqual"', () => {
      const validationError = { arePasswordsEqual: false };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('The passwords must match');
    });

    it('should return "Incorrect password" when the error if of type "incorrectPassword"', () => {
      const validationError = { incorrectPassword: true };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('Incorrect password');
    });

    it('should return "Too many login attempts..." when the error if of type "correctPassword"', () => {
      const validationError = { tooManyAttempts: true };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('Too many login attempts, please try again later');
    });

    it('should return "Unknown error :c" when the error if of type "correctPassword"', () => {
      const validationError = { unknownFbError: true };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('Unknown error :c');
    });

    it('should return "Email already in use..." when the error if of type "emailNotAvailable"', () => {
      const validationError = { emailNotAvailable: true };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('Email already in use, try using another one');
    });

    it('should return "User not found" when the error if of type "userNotFound"', () => {
      const validationError = { userNotFound: true };

      const result = getErrorMessages(validationError);

      expect(result).toEqual('User not found');
    });
  });

  describe('getErrorFromField()', () => {
    it('should return null if the control does not exist in the formGroup', () => {
      const fg = new FormGroup({
        field: new FormControl('Some Value'),
      });

      const result = getErrorFromField(fg, 'anotherField');

      expect(result).toBeNull();
    });

    it('should return null if the formGroup has no errors', () => {
      const fg = new FormGroup({
        field: new FormControl('Some Value'),
      });

      const result = getErrorFromField(fg, 'field');

      expect(result).toBeNull();
    });

    it('should return a string if the control has errors', () => {
      const fg = new FormGroup({
        field: new FormControl('', Validators.required),
      });

      const result = getErrorFromField(fg, 'field');

      expect(result).toBeTruthy();
    });
  });

  describe('getErrorFromForm()', () => {
    it('should return null if the formGroup has no errors', () => {
      const fg = new FormGroup({
        field: new FormControl('Some Value'),
      });

      const result = getErrorFromForm(fg);

      expect(result).toBeNull();
    });

    it('should return a string if the formGroup has errors', () => {
      const fg = new FormGroup({
        field: new FormControl('Some Value'),
      });
      fg.setErrors({ customError: true });

      const result = getErrorFromForm(fg);

      expect(result).toBeTruthy();
    });
  });
});
