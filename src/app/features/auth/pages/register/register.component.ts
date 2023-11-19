import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';

import {
  canPrintError,
  getErrorFromField,
  getErrorFromForm,
} from '@core/utils';
import { validEmail, confirmPassword } from '@core/validators';
import { AuthService } from '@core/services';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseError } from '@angular/fire/app';
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
  public onSubmit(): void {
    this.registerForm.controls['confirmPassword'].setErrors(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      if (this.getFormError()) {
        this.registerForm.controls['confirmPassword'].setErrors({
          arePasswordsEqual: true,
        });
      }
      return;
    }
    this.submitStatus = 'loading';
    this.authService
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .then(() => {
        this.submitStatus = 'success';
        this.router.navigateByUrl('/admin');
      })
      .catch((error) => {
        this.submitStatus = 'error';
        const fbError = error as FirebaseError;
        if (fbError.code === AUTH_EMAIL_ALREADY_IN_USE)
          console.error('Email already in use');
        else console.error('Unknown error');
      });
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
