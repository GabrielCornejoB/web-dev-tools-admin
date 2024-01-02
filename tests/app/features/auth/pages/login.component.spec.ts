import { DestroyRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { StoreMock, FormBuilderMock, DestroyRefMock } from '@tests/mocks';
import { LoginComponent } from '@auth/pages/login/login.component';

describe('Login - Component', () => {
  let component: LoginComponent;
  let formBuilder: FormBuilder;
  let store: Store;
  let destroyRef: DestroyRef;

  const validFormValue = { email: 'mail@mail.com', password: 'password123' };
  const invalidFormValue = { email: '', password: '' };

  function setFormAsInvalid() {
    formBuilder = FormBuilderMock(invalidFormValue, 'invalid');
    component = new LoginComponent(formBuilder, store, destroyRef);
  }

  beforeEach(() => {
    jest.clearAllMocks();

    formBuilder = FormBuilderMock(validFormValue, 'valid');
    store = StoreMock;
    destroyRef = DestroyRefMock;

    component = new LoginComponent(formBuilder, store, destroyRef);
  });

  it('should create and initializate component', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it("should not set errors if the store doesn't returns errors", () => {
      jest.spyOn(store, 'select').mockImplementationOnce(() => of(null));

      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
      expect(
        component.loginForm.controls['email'].setErrors,
      ).not.toHaveBeenCalled();
      expect(
        component.loginForm.controls['password'].setErrors,
      ).not.toHaveBeenCalled();
    });

    it('should set an error in the email field if the store returns "userNotFound"', () => {
      const errorMock = { userNotFound: true };
      jest.spyOn(store, 'select').mockImplementation(() => of(errorMock));

      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
      expect(
        component.loginForm.controls['email'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });

    it('should set an error in both fields if the store returns "invalidLoginCredentials"', () => {
      const errorMock = { invalidLoginCredentials: true };
      jest.spyOn(store, 'select').mockImplementationOnce(() => of(errorMock));

      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
      expect(
        component.loginForm.controls['password'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });

    it('should set an error in the password field if the store returns any other error', () => {
      const errorMock = { tooManyAttempts: true };
      jest.spyOn(store, 'select').mockImplementationOnce(() => of(errorMock));

      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
      expect(
        component.loginForm.controls['password'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });
  });

  describe('onSubmit()', () => {
    it('should call markAllAsTouched() if the form is invalid', () => {
      setFormAsInvalid();

      component.onSubmit();

      expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the login action if the form is valid', async () => {
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('getError()', () => {
    it('should return error message if field exists and is invalid', () => {
      setFormAsInvalid();

      const result = component.getError('email');

      expect(result).toBeTruthy();
    });
    it('should return null if field exists and is valid', () => {
      const result = component.getError('email');

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
