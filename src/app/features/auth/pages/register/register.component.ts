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
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  //* Variables
  // TODO: Type form with interface
  public registerForm: FormGroup = this.fb.group(
    {
      username: ['', [V.required, V.minLength(5)]],
      email: ['', [V.required, validEmail]],
      password: ['', [V.required, V.minLength(6)]],
      confirmPassword: ['', [V.required, V.minLength(6)]],
    },
    { validators: [confirmPassword] }
  );
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  public hasSubmittedForm: boolean = false;

  //* Functions
  public async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.hasSubmittedForm = true;
      this.registerForm.markAllAsTouched();
      return;
    }

    try {
      const response = await this.authService.register(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      console.log({ response });
      this.router.navigateByUrl('/admin');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error(firebaseError.message);
    }
  }
  public getError(field: string) {
    return getErrorFromField(this.registerForm, field);
  }
  public hasError(field: string) {
    return canPrintError(this.registerForm, field);
  }
  public getFormError() {
    return getErrorFromForm(this.registerForm);
  }
}
