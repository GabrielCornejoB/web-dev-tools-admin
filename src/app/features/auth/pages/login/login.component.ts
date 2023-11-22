import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { FirebaseError } from '@angular/fire/app';

import { AuthService } from '@core/services';
import { getErrorFromField, canPrintError } from '@core/utils';
import { validEmail } from '@core/validators';
import { LoadingStatus } from '@core/types';
import { AUTH } from '@core/constants';

@Component({
  selector: 'wdt-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //* Dependency Injection
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  //* Variables
  loginForm: FormGroup = this.createForm();
  isVisible: boolean = false;
  submitStatus: LoadingStatus = 'init';

  //* Core Functions
  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.submitStatus = 'loading';

    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.submitStatus = 'success';
      this.router.navigateByUrl('/admin');
    } catch (error) {
      this.submitStatus = 'error';
      const { code } = error as FirebaseError;

      if (code === AUTH.USER_NOT_FOUND) {
        this.loginForm.controls['email'].setErrors({ userNotFound: true });
      } else {
        const validationError =
          code === AUTH.INVALID_LOGIN_CREDENTIALS ||
          code === AUTH.INVALID_PASSWORD
            ? { incorrectPassword: true }
            : code === AUTH.TOO_MANY_ATTEMPTS
            ? { tooManyAttemps: true }
            : { unknownFbError: true };
        this.loginForm.controls['password'].setErrors(validationError);
      }
    }
  }

  //* Utils
  getError(field: string) {
    return getErrorFromField(this.loginForm, field);
  }
  hasError(field: string) {
    return canPrintError(this.loginForm, field);
  }
  createForm() {
    return this.fb.group({
      email: ['', [V.required, validEmail]],
      password: ['', [V.required]],
    });
  }
}
