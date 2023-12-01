import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { FormBuilderMock, RouterMock, StoreMock } from '@testing/mocks';
import { RegisterComponent } from './register.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

function initComponent(invalidForm: boolean = false): RegisterComponent {
  return Injector.create({
    providers: [
      { provide: RegisterComponent },
      { provide: Store, useValue: StoreMock },
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
  let storeMock: Partial<Store> = StoreMock;

  beforeEach(() => {
    component = initComponent();
  });

  it('should create and initializate component', () => {
    expect(component).toBeTruthy();
    expect(component.registerForm).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should set errors in the email field if the store returns errors', () => {
      const errorMock = { emailNotAvailable: true };

      jest
        .spyOn(storeMock, 'select')
        .mockImplementationOnce(() => of(errorMock));

      component.ngOnInit();

      expect(storeMock.select).toHaveBeenCalled();
      expect(
        component.registerForm.controls['email'].setErrors,
      ).toHaveBeenCalledWith(errorMock);
    });
  });

  describe('onSubmit()', () => {
    it('should call markAllAsTouched() if the form is invalid', () => {
      component = initComponent(true);

      component.onSubmit();
      expect(component.registerForm.markAllAsTouched).toHaveBeenCalled();
      expect(
        component.registerForm.controls['confirmPassword'].setErrors,
      ).toHaveBeenCalledWith({ arePasswordsEqual: false });
    });

    it('should dispatch the register action if the form is valid', async () => {
      component = initComponent();

      component.onSubmit();

      expect(storeMock.dispatch).toHaveBeenCalled();
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
