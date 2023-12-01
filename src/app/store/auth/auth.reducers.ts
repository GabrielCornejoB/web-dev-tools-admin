import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthState } from './auth.state';
import { authActions } from './auth.actions';

const initialState: AuthState = {
  currentUser: undefined,
  isSubmitting: false,
  isLoading: false,
  backendError: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      backendError: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      backendError: action.backendError,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      backendError: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      backendError: action.backendError,
    })),

    on(authActions.logout, (state) => ({
      ...state,
      isSubmitting: true,
      backendError: null,
    })),
    on(authActions.logoutSuccess, (state) => ({
      ...state,
      isSubmitting: false,
      currentUser: null,
    })),
    on(authActions.logoutFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      backendError: action.backendError,
    })),

    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
      backendError: null,
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
  selectBackendError,
} = authFeature;
