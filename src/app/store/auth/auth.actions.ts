import { UserCreateDto, User, BackendError } from '@core/models';
import { createActionGroup, props } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ dto: UserCreateDto; password: string }>(),
    'Register Success': props<{ currentUser: User }>(),
    'Register Failure': props<{ backendError: BackendError }>(),
  },
});
