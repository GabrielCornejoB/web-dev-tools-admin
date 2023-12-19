import { FormControl, FormGroup } from '@angular/forms';
import { confirmPassword } from '@core/validators';

describe('ConfirmPassword - Validator', () => {
  it('should return null if both controls does not exist in the AbstractControl', () => {
    const fg = new FormGroup({
      user: new FormControl(),
      password: new FormControl(),
    });

    const result = confirmPassword(fg);

    expect(result).toBeNull();
  });

  it('should return null if both fields match', () => {
    const fg = new FormGroup({
      password: new FormControl('guessthepassword'),
      confirmPassword: new FormControl('guessthepassword'),
    });

    const result = confirmPassword(fg);

    expect(result).toBeNull();
  });

  it('should return ValidationError if fields do not match', () => {
    const fg = new FormGroup({
      password: new FormControl('guessthepassword'),
      confirmPassword: new FormControl('apassword'),
    });

    const result = confirmPassword(fg);

    expect(result).toBeTruthy();
  });
});
