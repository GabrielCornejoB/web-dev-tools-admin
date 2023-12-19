import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getErrorMessages,
  getErrorFromField,
  getErrorFromForm,
  canPrintError,
} from '@core/utils';
import { FormBuilderMock } from '@tests/mocks';

describe('FormErrors - Utils', () => {
  describe('getErrorMessages()', () => {
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

    it('should return "Invalid field" if the error does not exists in the object', () => {
      const validationError = { askjnasdjn: false };

      const result = getErrorMessages(validationError);

      expect(result).toBe('Invalid field');
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

  describe('canPrintError()', () => {
    it('should return true if formGroup has error and field hjas been touched', () => {
      const fg = FormBuilderMock({ test: 'test' }, true).group() as any;

      const result = canPrintError(fg, 'test');

      expect(result).toBeTruthy();
    });
  });
});
