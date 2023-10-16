import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';

import { getErrorFromField, getErrorFromForm } from '@core/utils';
import { validEmail, confirmPassword } from '@core/validators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

  //* Variables
  public registerForm: FormGroup = this.fb.group(
    {
      username: ['', [V.required, V.minLength(5)]],
      email: ['', [V.required, validEmail]],
      password: ['', [V.required, V.minLength(5)]],
      confirmPassword: ['', [V.required, V.minLength(5)]],
    },
    { validators: [confirmPassword] }
  );
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  //* Functions
  public onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value);
  }
  public getError(field: string) {
    return getErrorFromField(this.registerForm, field);
  }
  public getFormError() {
    return getErrorFromForm(this.registerForm);
  }
}
