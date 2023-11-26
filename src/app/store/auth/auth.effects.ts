import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { authActions } from './auth.actions';
import { FirebaseError } from '@angular/fire/app';
import { BackendError } from '@core/models';
import { AUTH } from '@core/constants';
import { Router } from '@angular/router';

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
            const backendError: BackendError =
              code === AUTH.EMAIL_ALREADY_IN_USE
                ? { emailNotAvailable: true }
                : { unknownFbError: true };
            return of(authActions.registerFailure({ backendError }));
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
            const backendError: BackendError =
              code === AUTH.USER_NOT_FOUND
                ? { userNotFound: true }
                : code === AUTH.INVALID_LOGIN_CREDENTIALS ||
                    code === AUTH.INVALID_PASSWORD
                  ? { invalidLoginCredentials: true }
                  : code === AUTH.TOO_MANY_ATTEMPTS
                    ? { tooManyAttempts: true }
                    : { unknownFbError: true };
            return of(authActions.loginFailure({ backendError }));
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
