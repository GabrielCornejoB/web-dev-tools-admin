import { BackendError, User, UserCreateDto } from '@core/models';

export interface RegisterProps {
  dto: UserCreateDto;
  password: string;
}
export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthSuccessProps {
  currentUser: User;
}
export interface AuthFailureProps {
  authError: BackendError | null;
  fieldError: BackendError | null;
}
