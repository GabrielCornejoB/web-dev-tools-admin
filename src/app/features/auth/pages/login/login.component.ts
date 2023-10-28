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
    // TODO: Type form with interface
  public loginForm: FormGroup = this.fb.group({
    email: ['', [V.required, validEmail]],
    password: ['', [V.required, V.minLength(5)]],
  });
  public isVisible: boolean = true;

  //* Core Functions
  public async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    try {
      const response = await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      console.log(response);
      this.router.navigateByUrl('/admin');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error(firebaseError.message);
    }
  }

  //* Utils
  public getError(field: string) {
    return getErrorFromField(this.loginForm, field);
  }
  public hasError(field: string) {
    return canPrintError(this.loginForm, field);
  }
}
