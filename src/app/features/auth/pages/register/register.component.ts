import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  canPrintError,
  getErrorFromField,
  getErrorFromForm,
} from '@core/utils';
import { validEmail, confirmPassword } from '@core/validators';
import { ErrorMessageComponent } from '@shared/components';
import { InputDirective, LabelDirective } from '@shared/directives';
import {
  authActions,
  selectIsSubmitting,
  selectBackendError,
} from '@store/auth';

@Component({
  selector: 'wdt-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,

    InputDirective,
    LabelDirective,
    ErrorMessageComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  //* Dependency Injection
  private fb = inject(FormBuilder);
  private store = inject(Store);

  //* Attributes
  registerForm: FormGroup = this.createForm();
  isPasswordHidden: boolean = true;
  isConfirmPasswordHidden: boolean = true;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
  });
  subscription = new Subscription();

  //* Lifecycle
  ngOnInit(): void {
    this.subscription = this.store
      .select(selectBackendError)
      .subscribe((backendError) => {
        this.registerForm.controls['email'].setErrors(backendError);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
