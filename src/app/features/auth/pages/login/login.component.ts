import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';

import { getErrorFromField, canPrintError } from '@core/utils';
import { validEmail } from '@core/validators';
import { AuthService } from '@core/services';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseError } from '@angular/fire/app';
import { LoadingStatus } from '@core/types';
import {
  AUTH_INVALID_LOGIN_CREDENTIALS,
  AUTH_TOO_MANY_ATTEMPTS,
} from '@core/constants';

@Component({
  selector: 'wdt-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //* Dependency Injection
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  //* Variables
  public loginForm: FormGroup = this.createForm();
  public isVisible: boolean = false;
  public submitStatus: LoadingStatus = 'init';

  //* Core Functions
  public async onSubmit() {
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
      console.log({ error });
      console.log('-----');
      console.log(error);
      this.submitStatus = 'error';
      const fbError = error as FirebaseError;

      const validationError =
        fbError.code === AUTH_INVALID_LOGIN_CREDENTIALS
          ? { correctPassword: false }
          : fbError.code === AUTH_TOO_MANY_ATTEMPTS
          ? { tooManyAttemps: true }
          : { unknownError: true };
      this.loginForm.controls['password'].setErrors(validationError);
    }
  }

  //* Utils
  public getError(field: string) {
    return getErrorFromField(this.loginForm, field);
  }
  public hasError(field: string) {
    return canPrintError(this.loginForm, field);
  }
  public createForm() {
    return this.fb.group({
      email: ['', [V.required, validEmail]],
      password: ['', [V.required]],
    });
  }
}
