import { UserCreateDto, User, BackendError } from '@core/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ dto: UserCreateDto; password: string }>(),
    'Register Success': props<{ currentUser: User }>(),
    'Register Failure': props<{ backendError: BackendError }>(),

    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ currentUser: User }>(),
    'Login Failure': props<{ backendError: BackendError }>(),

    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ backendError: string }>(),
  },
});
