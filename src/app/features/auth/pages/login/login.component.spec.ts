import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  provideAuth,
  getAuth,
  UserCredential,
  IdTokenResult,
} from '@angular/fire/auth';

import { AuthService } from '@core/services';
import { environment } from '@env/environment';
import { LoginComponent } from './login.component';
import { getText, setInputValue } from '@testing/helpers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        NoopAnimationsModule,
      ],
      providers: [AuthService, provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('error messages', () => {
    it('should set a field error message if the email field is invalid', () => {
      setInputValue(fixture, 'email-input', 'not an email');
      fixture.detectChanges();

      const inputErrorMessage = getText(fixture, 'email-error');
      expect(inputErrorMessage).toBeTruthy();
    });

    it('should set a field error message if the password field is invalid', () => {
      setInputValue(fixture, 'password-input', '000');
      fixture.detectChanges();

      const inputErrorMessage = getText(fixture, 'password-error');
      expect(inputErrorMessage).toBeTruthy();
    });

    // it('should set a form error message if the credentials are invalid', () => {});
  });

  describe('onSubmit()', () => {
    // it('should call markAllAsTouched() if the form is submitted with invalid fields', () => {
    //   setInputValue(fixture, 'email-input', 'not an email');
    //   setInputValue(fixture, 'password-input', '000');
    //   fixture.detectChanges();
    // });
    it('should call the login() function from the AuthService if the credentials are valid', () => {
      component.loginForm.patchValue({
        email: 'test@mail.com',
        password: '123456789',
      });
      // TODO: Validate the submitState variable changing here using the asyncData helpers
      jest.spyOn(authService, 'login').mockResolvedValue({} as UserCredential);
      component.onSubmit();

      expect(component.loginForm.valid).toBeTruthy();
      expect(authService.login).toHaveBeenCalled();
    });
    // it('should redirect to "/admin" if the credentials are valid', () => {});
    // it('should set an error message if the form is submitted but an error occurs', () => {});
  });
});
