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
import { combineLatest, filter, map } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  authActions,
  selectIsSubmitting,
  selectAuthError,
  selectFieldError,
} from '@store/auth';
import {
  canPrintError,
  getErrorFromField,
  getErrorFromForm,
} from '@core/utils';
import { validEmail, confirmPassword } from '@core/validators';
import { InputComponent } from '@shared/components';
import { ButtonDirective } from '@shared/directives';
import { FORM_ERROR_MESSAGES } from '@core/constants';

@Component({
  selector: 'wdt-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    InputComponent,
    ButtonDirective,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private destroyRef: DestroyRef,
  ) {}

  //* Attributes
  registerForm: FormGroup = this.createForm();
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    authError: this.store.select(selectAuthError).pipe(
      map((err) => {
        if (!err) return;
        const errorKey = Object.keys(err)[0];
        return FORM_ERROR_MESSAGES[errorKey];
      }),
    ),
  });

  //* Lifecycle
  ngOnInit(): void {
    this.store
      .select(selectFieldError)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((err) => !!err),
      )
      .subscribe((backendError) => {
        this.registerForm.controls['email'].setErrors(backendError);
      });
  }

  //* Core Functions
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      if (this.getFormError()) {
        this.registerForm.controls['confirmPassword'].setErrors({
          arePasswordsEqual: false,
        });
      }
      return;
    }

    this.store.dispatch(
      authActions.register({
        dto: {
          email: this.registerForm.value.email,
          username: this.registerForm.value.username,
        },
        password: this.registerForm.value.password,
      }),
    );
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
