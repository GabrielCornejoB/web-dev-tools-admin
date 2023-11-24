import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { authActions } from './auth.actions';
import { FirebaseError } from '@angular/fire/app';

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
            console.log({ error });
            return of(authActions.registerFailure());
          }),
        );
      }),
    );
  },
  { functional: true },
);
