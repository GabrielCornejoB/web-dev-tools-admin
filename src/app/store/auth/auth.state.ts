import { BackendError, User } from '@core/models';

export interface AuthState {
  isSubmitting: boolean;
  isLoading: boolean;
  currentUser: User | null | undefined;
  authError: BackendError | null;
  fieldError: BackendError | null;
}
