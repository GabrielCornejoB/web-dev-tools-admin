import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthState } from './auth.state';
import { authActions } from './auth.actions';

const initialState: AuthState = {
  currentUser: undefined,
  isSubmitting: false,
  isLoading: false,
  authError: null,
  fieldError: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      authError: null,
      fieldError: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      authError: action.authError,
      fieldError: action.fieldError,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      authError: null,
      fieldError: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      authError: action.authError,
      fieldError: action.fieldError,
    })),

    on(authActions.logout, (state) => ({
      ...state,
      isSubmitting: true,
      authError: null,
      fieldError: null,
    })),
    on(authActions.logoutSuccess, (state) => ({
      ...state,
      isSubmitting: false,
      currentUser: null,
    })),
    on(authActions.logoutFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      authError: action.authError,
      fieldError: action.fieldError,
    })),

    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
      authError: null,
      fieldError: null,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectAuthError,
  selectFieldError,
} = authFeature;
