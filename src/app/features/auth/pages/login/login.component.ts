import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { getErrorFromField, canPrintError } from '@core/utils';
import { validEmail } from '@core/validators';
import { ErrorMessageComponent } from '@shared/components';
import { InputDirective, LabelDirective } from '@shared/directives';
import {
  authActions,
  selectBackendError,
  selectIsSubmitting,
} from '@store/auth';

@Component({
  selector: 'wdt-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,

    InputDirective,
    LabelDirective,
    ErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  //* Dependency Injection
  private fb = inject(FormBuilder);
  private store = inject(Store);

  //* Attributes
  loginForm: FormGroup = this.createForm();
  isVisible: boolean = false;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
  });
  subscription = new Subscription();

  //* Lifecycle
  ngOnInit(): void {
    this.subscription = this.store
      .select(selectBackendError)
      .subscribe((backendError) => {
        if (!backendError) return;
        if (backendError['userNotFound'])
          return this.loginForm.controls['email'].setErrors(backendError);
        if (backendError['invalidLoginCredentials']) {
          this.loginForm.controls['email'].setErrors(backendError);
          this.loginForm.controls['password'].setErrors(backendError);
          return;
        }
        this.loginForm.controls['password'].setErrors(backendError);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
