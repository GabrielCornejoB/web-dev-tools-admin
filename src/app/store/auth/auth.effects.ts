import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { BackendError } from '@core/models';
import { AUTH } from '@core/constants';
import { authActions } from './auth.actions';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ dto, password }) => {
        return authService.register(dto, password).pipe(
          map((currentUser) => {
            return authActions.registerSuccess({
              currentUser,
            });
          }),
          catchError((error: FirebaseError) => {
            const { code } = error;

            const isFieldError = code === AUTH.EMAIL_ALREADY_IN_USE;
            const authError = !isFieldError ? { authError: true } : null;
            const fieldError = isFieldError
              ? { emailNotAvailable: true }
              : null;

            return of(authActions.registerFailure({ authError, fieldError }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/home');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) => {
        return authService.login(email, password).pipe(
          map((currentUser) => {
            return authActions.loginSuccess({
              currentUser,
            });
          }),
          catchError((error: FirebaseError) => {
            const { code } = error;

            let authError: BackendError | null = null;
            let fieldError: BackendError | null = null;

            switch (code) {
              case AUTH.USER_NOT_FOUND:
                fieldError = { userNotFound: true };
                break;
              case AUTH.INVALID_LOGIN_CREDENTIALS || AUTH.INVALID_PASSWORD:
                fieldError = { invalidLoginCredentials: true };
                break;
              case AUTH.TOO_MANY_ATTEMPTS:
                authError = { tooManyAttemps: true };
                break;
              default:
                authError = { authError: true };
                break;
            }

            return of(authActions.loginFailure({ authError, fieldError }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/home');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() =>
        authService.logout().pipe(
          map(() => authActions.logoutSuccess()),
          catchError((error) => of(authActions.logoutFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);
export const redirectAfterLogoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logoutSuccess),
      tap(() => {
        router.navigateByUrl('/auth/login');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const getCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() =>
        authService.getAuthState().pipe(
          map((currentUser) => {
            if (currentUser)
              return authActions.getCurrentUserSuccess({ currentUser });
            return authActions.getCurrentUserFailure();
          }),
        ),
      ),
    );
  },
  { functional: true },
);
