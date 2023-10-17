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
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  //* Variables
  public loginForm: FormGroup = this.fb.group({
    email: ['', [V.required, validEmail]],
    password: ['', [V.required, V.minLength(5)]],
  });
  public isVisible: boolean = true;
  public isLoggedIn = this.authService.isLoggedIn;

  //* Functions
  public onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.setUser({
      email: this.loginForm.controls['password'].value,
    });
    this.router.navigateByUrl('/admin');
    console.log(this.loginForm.value);
  }
  public getError(field: string) {
    return getErrorFromField(this.loginForm, field);
  }
  public hasError(field: string) {
    return canPrintError(this.loginForm, field);
  }
}
