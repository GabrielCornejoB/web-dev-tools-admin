import { Tool } from '@core/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendError } from '../../core/models/backend-errors.model';

export const toolsActions = createActionGroup({
  source: 'tools',
  events: {
    Create: props<{ tool: Tool }>(),
    'Create Success': emptyProps(),
    'Create Failure': props<{ backendError: BackendError }>(),
  },
});
