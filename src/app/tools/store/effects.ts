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

export const getFilteredToolsEffect = createEffect(
  (actions$ = inject(Actions), toolsService = inject(ToolsService)) => {
    return actions$.pipe(
      ofType(toolsActions.getFilteredTools),
      switchMap(({ category }) => {
        return toolsService.getAllByCategory(category).pipe(
          map((tools: Tool[]) => {
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

export const createToolEffect = createEffect(
  (actions$ = inject(Actions), toolsService = inject(ToolsService)) => {
    return actions$.pipe(
      ofType(toolsActions.createTool),
      switchMap(({ toolDto: newTool }) => {
        return toolsService.create(newTool).pipe(
          map((doc) => {
            return toolsActions.createToolSuccess({
              newTool: { ...newTool, id: doc.id },
            });
          }),
          catchError((error: FirebaseError) => {
            return of(toolsActions.createToolFailure({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteToolEffect = createEffect(
  (actions$ = inject(Actions), toolsService = inject(ToolsService)) => {
    return actions$.pipe(
      ofType(toolsActions.deleteTool),
      switchMap(({ id }) => {
        return toolsService.delete(id).pipe(
          map(() => {
            return toolsActions.deleteToolSuccess({ id });
          }),
          catchError((error: FirebaseError) => {
            return of(toolsActions.deleteToolFailure({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
