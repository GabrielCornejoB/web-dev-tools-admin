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

import {
  canPrintError,
  getErrorFromField,
  getErrorFromForm,
} from '@core/utils';
import { AuthService } from '@core/services';
import { validEmail, confirmPassword } from '@core/validators';
import { LoadingStatus } from '@core/types';
import { AUTH } from '@core/constants';

@Component({
  selector: 'wdt-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  //* Dependency Injection
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  //* Variables
  registerForm: FormGroup = this.createForm();
  isPasswordHidden: boolean = true;
  isConfirmPasswordHidden: boolean = true;
  submitStatus: LoadingStatus = 'init';

  //* Core Functions
  async onSubmit(): Promise<void> {
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
        {
          email: this.registerForm.value.email,
          username: this.registerForm.value.username,
        },
        this.registerForm.value.password,
      );
      this.submitStatus = 'success';
      this.router.navigateByUrl('/admin');
    } catch (error) {
      this.submitStatus = 'error';
      const fbError = error as FirebaseError;
      const validationError =
        fbError.code === AUTH.EMAIL_ALREADY_IN_USE
          ? { emailNotAvailable: true }
          : { unknownFbError: true };
      this.registerForm.controls['email'].setErrors(validationError);
    }
  }

  //* Utils
  getError(field: string) {
    return getErrorFromField(this.registerForm, field);
  }
  hasError(field: string) {
    return canPrintError(this.registerForm, field);
  }
  getFormError() {
    return getErrorFromForm(this.registerForm);
  }
  createForm() {
    return this.fb.group(
      {
        username: ['', [V.required, V.minLength(5)]],
        email: ['', [V.required, validEmail]],
        password: ['', [V.required, V.minLength(6)]],
        confirmPassword: ['', [V.required]],
      },
      { validators: [confirmPassword] },
    );
  }
}
