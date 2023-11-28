import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { FormBuilderMock, RouterMock, StoreMock } from '@testing/mocks';
import { LoginComponent } from './login.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

function initComponent(invalidForm: boolean = false): LoginComponent {
  return Injector.create({
    providers: [
      { provide: LoginComponent },
      { provide: Store, useValue: StoreMock },
      {
        provide: FormBuilder,
        useValue: FormBuilderMock(
          {
            email: invalidForm ? '' : 'mail@mail.com',
            password: invalidForm ? '' : 'password123',
          },
          invalidForm,
        ),
      },
      { provide: Router, useValue: RouterMock },
    ],
  }).get(LoginComponent);
}

describe('Login - Component', () => {
  let component: LoginComponent;
  let storeMock: Partial<Store> = StoreMock;

  beforeEach(() => {
    component = initComponent();
  });

  it('should create and initializate component', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it("should not set errors if the store doesn't returns errors", () => {
      jest.spyOn(storeMock, 'select').mockImplementationOnce(() => of(null));

      component.ngOnInit();

      expect(storeMock.select).toHaveBeenCalled();
      expect(
        component.loginForm.controls['email'].setErrors,
      ).not.toHaveBeenCalled();
      expect(
        component.loginForm.controls['password'].setErrors,
      ).not.toHaveBeenCalled();
    });

    it('should set an error in the email field if the store returns "userNotFound"', () => {
      const errorMock = { userNotFound: true };
      jest
        .spyOn(storeMock, 'select')
        .mockImplementationOnce(() => of(errorMock));

      component.ngOnInit();

      expect(storeMock.select).toHaveBeenCalled();
      expect(
        component.loginForm.controls['email'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });

    it('should set an error in both fields if the store returns "invalidLoginCredentials"', () => {
      const errorMock = { invalidLoginCredentials: true };
      jest
        .spyOn(storeMock, 'select')
        .mockImplementationOnce(() => of(errorMock));

      component.ngOnInit();

      expect(storeMock.select).toHaveBeenCalled();

      expect(
        component.loginForm.controls['password'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });

    it('should set an error in the password field if the store returns any other error', () => {
      const errorMock = { tooManyAttempts: true };
      jest
        .spyOn(storeMock, 'select')
        .mockImplementationOnce(() => of(errorMock));

      component.ngOnInit();

      expect(storeMock.select).toHaveBeenCalled();
      expect(
        component.loginForm.controls['password'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe when the component destroys', () => {
      jest.spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();

      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('onSubmit()', () => {
    it('should call markAllAsTouched() if the form is invalid', () => {
      component = initComponent(true);

      component.onSubmit();

      expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the login action if the form is valid', async () => {
      component = initComponent();

      component.onSubmit();

      expect(storeMock.dispatch).toHaveBeenCalled();
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
