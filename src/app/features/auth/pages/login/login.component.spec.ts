import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@core/services';
import { Injector } from '@angular/core';

import { AuthServiceMock, FormBuilderMock, RouterMock } from '@testing/mocks';
import { LoginComponent } from './login.component';

function initComponent(invalidForm: boolean = false): LoginComponent {
  return Injector.create({
    providers: [
      { provide: LoginComponent },
      { provide: AuthService, useValue: AuthServiceMock },
      {
        provide: FormBuilder,
        useValue: FormBuilderMock(
          {
            email: invalidForm ? '' : 'mail@mail.com',
            password: invalidForm ? '' : 'password123',
          },
          invalidForm
        ),
      },
      { provide: Router, useValue: RouterMock },
    ],
  }).get(LoginComponent);
}

describe('Login - Component', () => {
  let component: LoginComponent;
  let authServiceMock: Partial<AuthService> = AuthServiceMock;
  let routerMock: Partial<Router> = RouterMock;

  beforeEach(() => {
    component = initComponent();
  });

  it('should create and initializate component', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeTruthy();
    expect(component.isVisible).toBeFalsy();
    expect(component.submitStatus).toBe('init');
  });

  describe('onSubmit()', () => {
    it('should call markAllAsTouched() if the form is invalid', async () => {
      component = initComponent(true);

      await component.onSubmit();

      expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
      expect(authServiceMock.login).not.toHaveBeenCalled();
    });

    it('should call login() from the AuthService if the form is valid', async () => {
      await component.onSubmit();

      expect(authServiceMock.login).toHaveBeenCalled();
    });

    it('should change submitStatus from "loading" to "success" if there are no errors and then redirect', async () => {
      const promise = component.onSubmit();

      expect(component.submitStatus).toBe('loading');
      await promise;
      expect(component.submitStatus).toBe('success');
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/admin');
    });

    it('should change submitStatus from "loading" to "error" if there are errors', async () => {
      jest.spyOn(authServiceMock, 'login').mockRejectedValueOnce(() => {});
      const promise = component.onSubmit();

      expect(component.submitStatus).toBe('loading');
      await promise;
      expect(component.submitStatus).toBe('error');
    });
  });

  describe('getError()', () => {
    it('should return error message if field exists and is invalid', () => {
      component = initComponent(true);

      const result = component.getError('email');

      expect(result).toBeTruthy();
    });
    it('should return null if field exists and is valid', () => {
      component = initComponent();

      const result = component.getError('email');

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
