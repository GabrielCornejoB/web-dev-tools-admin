import { BackendError, User } from '@core/models';

export interface AuthState {
  isSubmitting: boolean;
  isLoading: boolean;
  currentUser: User | null | undefined;
  backendError: BackendError | null;
}
