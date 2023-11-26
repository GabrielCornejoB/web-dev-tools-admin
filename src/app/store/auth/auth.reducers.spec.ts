import { authReducer } from './auth.reducers';
import { AuthState } from './auth.state';
import { authActions } from './auth.actions';
import { User } from '@core/models';

describe('Auth - Reducers', () => {
  const mockState: AuthState = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    backendError: null,
  };
  const mockUser: User = {
    uid: '123',
    email: '',
    isAdmin: false,
    username: '',
  };
  const mockError = { error: 'error' };

  describe('On Register actions', () => {
    it('should change isSubmitting on "register"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: true,
        backendError: null,
      };

      const result = authReducer(mockState, authActions.register);
      expect(result).toEqual(expected);
    });

    it('should change isSubmitting & currentUser on "registerSuccess"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: false,
        currentUser: mockUser,
      };

      const result = authReducer(
        mockState,
        authActions.registerSuccess({ currentUser: mockUser }),
      );
      expect(result).toEqual(expected);
    });

    it('should change isSubmitting on "registerFailure"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: false,
        backendError: mockError,
      };

      const result = authReducer(
        mockState,
        authActions.registerFailure({ backendError: mockError }),
      );
      expect(result).toEqual(expected);
    });
  });

  describe('On Login actions', () => {
    it('should change isSubmitting on "login"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: true,
        backendError: null,
      };

      const result = authReducer(mockState, authActions.login);
      expect(result).toEqual(expected);
    });

    it('should change isSubmitting & currentUser on "loginSuccess"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: false,
        currentUser: mockUser,
      };

      const result = authReducer(
        mockState,
        authActions.loginSuccess({ currentUser: mockUser }),
      );
      expect(result).toEqual(expected);
    });

    it('should change isSubmitting on "loginFailure"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: false,
        backendError: mockError,
      };

      const result = authReducer(
        mockState,
        authActions.loginFailure({ backendError: mockError }),
      );
      expect(result).toEqual(expected);
    });
  });

  describe('On Logout actions', () => {
    it('should change isSubmitting on "logout"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: true,
        backendError: null,
      };

      const result = authReducer(mockState, authActions.logout);
      expect(result).toEqual(expected);
    });

    it('should change isSubmitting & currentUser on "logoutSuccess"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: false,
        currentUser: null,
      };

      const result = authReducer(mockState, authActions.logoutSuccess);
      expect(result).toEqual(expected);
    });

    it('should change isSubmitting on "logoutFailure"', () => {
      const expected: AuthState = {
        ...mockState,
        isSubmitting: false,
        backendError: mockError,
      };

      const result = authReducer(
        mockState,
        authActions.logoutFailure({ backendError: mockError }),
      );
      expect(result).toEqual(expected);
    });
  });
});
