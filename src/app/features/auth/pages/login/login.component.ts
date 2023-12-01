import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  authActions,
  selectBackendError,
  selectIsSubmitting,
} from '@store/auth';
import { getErrorFromField, canPrintError } from '@core/utils';
import { validEmail } from '@core/validators';
import { InputComponent } from '@shared/components';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'wdt-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    InputComponent,
    ButtonDirective,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  //* Dependency Injection
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  //* Attributes
  loginForm: FormGroup = this.createForm();
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
  });

  //* Lifecycle
  ngOnInit(): void {
    this.store
      .select(selectBackendError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((backendError) => {
        if (!backendError) return;
        if (backendError['userNotFound'])
          return this.loginForm.controls['email'].setErrors(backendError);
        if (backendError['invalidLoginCredentials']) {
          this.loginForm.controls['password'].setErrors(backendError);
          return;
        }
        this.loginForm.controls['password'].setErrors(backendError);
      });
  }

  //* Core Functions
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      authActions.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }),
    );
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
