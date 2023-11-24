import { UserCreateDto, User } from '@core/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ dto: UserCreateDto; password: string }>(),
    'Register Success': props<{ currentUser: User }>(),
    'Register Failure': emptyProps(),
    // 'Register Failure': props<{ errors: string }>(),
  },
});
