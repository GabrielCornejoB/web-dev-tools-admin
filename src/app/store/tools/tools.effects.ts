import { inject } from '@angular/core';
import { ToolsService } from '@core/services/tools.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { toolsActions } from './tools.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { BackendError } from '@core/models';

export const createToolEffect = createEffect(
  (actions$ = inject(Actions), toolsService = inject(ToolsService)) => {
    return actions$.pipe(
      ofType(toolsActions.create),
      switchMap(({ tool }) => {
        return toolsService.createTool(tool).pipe(
          map(() => {
            return toolsActions.createSuccess();
          }),
          catchError((error: FirebaseError) => {
            const { code } = error;
            const backendError: BackendError = { firestoreFailed: true };
            return of(toolsActions.createFailure({ backendError }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
