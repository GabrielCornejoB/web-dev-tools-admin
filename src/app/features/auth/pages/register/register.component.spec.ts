import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { Injector } from '@angular/core';
import { AuthServiceMock, FormBuilderMock, RouterMock } from '@testing/mocks';
import { FormBuilder } from '@angular/forms';

function initComponent(invalidForm: boolean = false): RegisterComponent {
  return Injector.create({
    providers: [
      { provide: RegisterComponent },
      { provide: AuthService, useValue: AuthServiceMock },
      {
        provide: FormBuilder,
        useValue: FormBuilderMock(
          {
            userName: invalidForm ? '' : 'johndoe',
            email: invalidForm ? '' : 'mail@mail.com',
            password: invalidForm ? '' : 'password123',
            confirmPassword: invalidForm ? '' : 'password123',
          },
          invalidForm
        ),
      },
      { provide: Router, useValue: RouterMock },
    ],
  }).get(RegisterComponent);
}

describe('Register - Component', () => {
  let component: RegisterComponent;
  let authServiceMock: Partial<AuthService>;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    component = initComponent();
  });

  it('should create and initializate component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {});
});
