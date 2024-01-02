import { DestroyRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { RegisterComponent } from '@auth/pages/register/register.component';
import { StoreMock, FormBuilderMock, DestroyRefMock } from '@tests/mocks';

describe('Register - Component', () => {
  let component: RegisterComponent;
  let formBuilder: FormBuilder;
  let store: Store;
  let destroyRef: DestroyRef;

  const validFormValue = {
    username: 'johndoe',
    email: 'email@email.com',
    password: 'password123',
    confirmPassword: 'password123',
  };
  const invalidFormValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  function setFormAsInvalid() {
    formBuilder = FormBuilderMock(invalidFormValue, 'invalid');
    component = new RegisterComponent(formBuilder, store, destroyRef);
  }

  beforeEach(() => {
    jest.clearAllMocks();

    formBuilder = FormBuilderMock(validFormValue, 'valid');
    store = StoreMock;
    destroyRef = DestroyRefMock;

    component = new RegisterComponent(formBuilder, store, destroyRef);
  });

  it('should create and initializate component', () => {
    expect(component).toBeTruthy();
    expect(component.registerForm).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should set errors in the email field if the store returns errors', () => {
      const errorMock = { emailNotAvailable: true };
      jest.spyOn(store, 'select').mockImplementationOnce(() => of(errorMock));

      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
      expect(
        component.registerForm.controls['email'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });
  });

  describe('onSubmit()', () => {
    it('should call markAllAsTouched() if the form is invalid', () => {
      setFormAsInvalid();

      component.onSubmit();

      expect(component.registerForm.markAllAsTouched).toHaveBeenCalled();
      expect(
        component.registerForm.controls['confirmPassword'].setErrors,
      ).toHaveBeenCalledWith({ arePasswordsEqual: false });
    });

    it('should dispatch the register action if the form is valid', async () => {
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('getError()', () => {
    it('should return error message if field exists and is invalid', () => {
      setFormAsInvalid();

      const result = component.getError('username');

      expect(result).toBeTruthy();
    });
    it('should return null if field exists and is valid', () => {
      const result = component.getError('username');

      expect(result).toBeNull();
    });
  });

  describe('hasError()', () => {
    it('should return true if field exists, is invalid and has been touched', () => {
      setFormAsInvalid();

      const result = component.hasError('email');

      expect(result).toBeTruthy();
    });

    it('should return null if field exists and is valid', () => {
      const result = component.hasError('email');

      expect(result).toBeNull();
    });
  });
});
