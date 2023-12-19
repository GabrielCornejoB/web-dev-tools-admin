import { FormControl } from '@angular/forms';
import { validEmail } from '../../../../app/core/validators/email.validator';

describe('Email - Validator', () => {
  it('should return null if the email is valid', () => {
    let email = 'johndoe@gmail.com';
    let result = validEmail(new FormControl(email));
    expect(result).toBeNull();

    email = 'johndoe@onu.com.co';
    result = validEmail(new FormControl(email));
    expect(result).toBeNull();

    email = 'mike@outlook.co.com';
    result = validEmail(new FormControl(email));
    expect(result).toBeNull();

    email = 'mondongo@upb.edu.co';
    result = validEmail(new FormControl(email));
    expect(result).toBeNull();

    email = 'kanye@west.uwu';
    result = validEmail(new FormControl(email));
    expect(result).toBeNull();
  });

  it('should return ValidationError if email is not valid', () => {
    let email = '';
    let result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();

    email = 'a';
    result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();

    email = 'johndoemail';
    result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();

    email = 'mail.com';
    result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();

    email = 'mail@.com';
    result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();

    email = 'mail@mail.';
    result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();

    email = 'mail@mail.a';
    result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();

    email = '@mail.a';
    result = validEmail(new FormControl(email));
    expect(result).toBeTruthy();
  });
});
