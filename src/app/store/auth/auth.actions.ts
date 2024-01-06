import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  AuthFailureProps,
  RegisterProps,
  AuthSuccessProps,
  LoginProps,
} from './auth-props.interfaces';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<RegisterProps>(),
    'Register Success': props<AuthSuccessProps>(),
    'Register Failure': props<AuthFailureProps>(),

    Login: props<LoginProps>(),
    'Login Success': props<AuthSuccessProps>(),
    'Login Failure': props<AuthFailureProps>(),

    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<AuthFailureProps>(),

    'Get current user': emptyProps(),
    'Get current user Success': props<AuthSuccessProps>(),
    'Get current user Failure': emptyProps(),
  },
});
