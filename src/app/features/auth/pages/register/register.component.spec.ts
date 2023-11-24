import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '@core/services';
import { AUTH } from '@core/constants';
import { AuthServiceMock, FormBuilderMock, RouterMock } from '@testing/mocks';
import { RegisterComponent } from './register.component';

function initComponent(invalidForm: boolean = false): RegisterComponent {
  return Injector.create({
    providers: [
      { provide: RegisterComponent },
      { provide: AuthService, useValue: AuthServiceMock },
      {
        provide: FormBuilder,
        useValue: FormBuilderMock(
          {
            username: invalidForm ? '' : 'johndoe',
            email: invalidForm ? '' : 'mail@mail.com',
            password: invalidForm ? '' : 'password123',
            confirmPassword: invalidForm ? '' : 'password123',
          },
          invalidForm,
        ),
      },
      { provide: Router, useValue: RouterMock },
    ],
  }).get(RegisterComponent);
}

describe('Register - Component', () => {
  let component: RegisterComponent;
  let authServiceMock: Partial<AuthService> = AuthServiceMock;
  let routerMock: Partial<Router> = RouterMock;

  beforeEach(() => {
    component = initComponent();
  });

  it('should create and initializate component', () => {
    expect(component).toBeTruthy();
    expect(component.registerForm).toBeTruthy();
    expect(component.isPasswordHidden).toBeTruthy();
    expect(component.isConfirmPasswordHidden).toBeTruthy();
    expect(component.submitStatus).toBe('init');
  });

  describe('onSubmit()', () => {
    it('should call markAllAsTouched() if the form is invalid', async () => {
      component = initComponent(true);

      await component.onSubmit();
      expect(component.registerForm.markAllAsTouched).toHaveBeenCalled();
      expect(authServiceMock.register).not.toHaveBeenCalled();
      expect(
        component.registerForm.controls['confirmPassword'].setErrors,
      ).toHaveBeenCalledWith({ arePasswordsEqual: false });
    });

    it('should call register() from AuthService if the form is valid', async () => {
      await component.onSubmit();

      expect(authServiceMock.register).toHaveBeenCalled();
    });

    it('should change submitStatus from "loading" to "success" if there are no errors and then redirect', async () => {
      const promise = component.onSubmit();

      expect(component.submitStatus).toBe('loading');
      await promise;
      expect(component.submitStatus).toBe('success');
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('should change submitStatus from "loading" to "error" if there are errors', async () => {
      jest.spyOn(authServiceMock, 'register').mockRejectedValueOnce(() => {});
      const promise = component.onSubmit();

      expect(component.submitStatus).toBe('loading');
      await promise;
      expect(component.submitStatus).toBe('error');
    });

    it('should set error to password field when credentials are invalid', async () => {
      jest
        .spyOn(authServiceMock, 'register')
        .mockImplementationOnce(() =>
          Promise.reject({ code: AUTH.EMAIL_ALREADY_IN_USE }),
        );
      await component.onSubmit();
      expect(
        component.registerForm.controls['email'].setErrors,
      ).toHaveBeenCalledWith({ emailNotAvailable: true });
    });
  });

  describe('getError()', () => {
    it('should return error message if field exists and is invalid', () => {
      component = initComponent(true);

      const result = component.getError('username');

      expect(result).toBeTruthy();
    });
    it('should return null if field exists and is valid', () => {
      component = initComponent();

      const result = component.getError('username');

      expect(result).toBeNull();
    });
  });

  describe('hasError()', () => {
    it('should return true if field exists, is invalid and has been touched', () => {
      component = initComponent(true);

      const result = component.hasError('email');

      expect(result).toBeTruthy();
    });

    it('should return null if field exists and is valid', () => {
      component = initComponent();

      const result = component.hasError('email');

      expect(result).toBeNull();
    });
  });
});
