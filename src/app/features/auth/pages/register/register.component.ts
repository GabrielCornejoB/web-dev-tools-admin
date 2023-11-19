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

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  canPrintError,
  getErrorFromField,
  getErrorFromForm,
} from '@core/utils';
import { AuthService } from '@core/services';
import { validEmail, confirmPassword } from '@core/validators';
import { LoadingStatus } from '@core/types';
import { AUTH_EMAIL_ALREADY_IN_USE } from '@core/constants';

@Component({
  selector: 'wdt-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  //* Dependency Injection
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  //* Variables
  public registerForm: FormGroup = this.createForm();
  public isPasswordHidden: boolean = true;
  public isConfirmPasswordHidden: boolean = true;
  public submitStatus: LoadingStatus = 'init';

  //* Core Functions
  public async onSubmit(): Promise<void> {
    this.registerForm.controls['confirmPassword'].setErrors(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      if (this.getFormError()) {
        this.registerForm.controls['confirmPassword'].setErrors({
          arePasswordsEqual: false,
        });
      }
      return;
    }

    this.submitStatus = 'loading';

    try {
      await this.authService.register(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      this.submitStatus = 'success';
      this.router.navigateByUrl('/admin');
    } catch (error) {
      this.submitStatus = 'error';
      const fbError = error as FirebaseError;
      const validationError =
        fbError.code === AUTH_EMAIL_ALREADY_IN_USE
          ? { emailNotAvailable: true }
          : { unknownFbError: true };
      this.registerForm.controls['email'].setErrors(validationError);
    }
  }

  //* Utils
  public getError(field: string) {
    return getErrorFromField(this.registerForm, field);
  }
  public hasError(field: string) {
    return canPrintError(this.registerForm, field);
  }
  public getFormError() {
    return getErrorFromForm(this.registerForm);
  }
  public createForm() {
    return this.fb.group(
      {
        username: ['', [V.required, V.minLength(5)]],
        email: ['', [V.required, validEmail]],
        password: ['', [V.required, V.minLength(6)]],
        confirmPassword: ['', [V.required]],
      },
      { validators: [confirmPassword] }
    );
  }
}
