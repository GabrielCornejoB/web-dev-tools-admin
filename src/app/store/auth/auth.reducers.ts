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
