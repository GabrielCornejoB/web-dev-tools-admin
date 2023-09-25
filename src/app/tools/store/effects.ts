import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToolsService } from '../services/tools.service';
import { toolsActions } from './actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { Tool } from '../models/tool.model';
import { FirebaseError } from 'firebase/app';

export const getToolsEffect = createEffect(
  (actions$ = inject(Actions), toolsService = inject(ToolsService)) => {
    return actions$.pipe(
      ofType(toolsActions.getTools),
      switchMap(() => {
        return toolsService.getAll().pipe(
          map((tools: Tool[]) => {
            console.log(tools);
            return toolsActions.getToolsSuccess({ tools });
          }),
          catchError((error: FirebaseError) => {
            return of(toolsActions.getToolsFailure({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);