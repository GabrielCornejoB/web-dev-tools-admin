import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';

import { AuthService } from '@core/services';
import { User } from '@core/models';
import { AUTH } from '@core/constants';

import { AuthServiceMock, RouterMock } from '@tests/mocks';
import {
  authActions,
  registerEffect,
  redirectAfterRegisterEffect,
  loginEffect,
  redirectAfterLoginEffect,
  logoutEffect,
  redirectAfterLogoutEffect,
  getCurrentUserEffect,
} from '@store/auth';

describe('Auth - Effects', () => {
  let actions$ = new Observable<Action>();
  const authServiceMock = AuthServiceMock as AuthService;
  const routerMock = RouterMock as Router;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Register effects', () => {
    it('should call register() and return the "registerSuccess" action', (done) => {
      const mockUser = { uid: '123' } as User;
      actions$ = of(
        authActions.register({
          dto: { email: '2', username: '2' },
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'register')
        .mockImplementation(() => of(mockUser));

      registerEffect(actions$, authServiceMock).subscribe((action) => {
        expect(authServiceMock.register).toHaveBeenCalled();
        expect(action).toEqual(
          authActions.registerSuccess({ currentUser: mockUser }),
        );
        done();
      });
    });

    it('should return the "registerFailure" action with "authError"', (done) => {
      const backendError = { authError: true };
      actions$ = of(
        authActions.register({
          dto: { email: '2', username: '2' },
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'register')
        .mockImplementation(() => throwError(() => new Error('error')));

      registerEffect(actions$, authServiceMock).subscribe((action) => {
        expect(action).toEqual(authActions.registerFailure({ backendError }));
        done();
      });
    });

    it('should return the "registerFailure" action with "emailNotAvailable"', (done) => {
      const backendError = { emailNotAvailable: true };
      actions$ = of(
        authActions.register({
          dto: { email: '2', username: '2' },
          password: '1',
        }),
      );

      jest.spyOn(authServiceMock, 'register').mockImplementation(() =>
        throwError(() => ({
          code: AUTH.EMAIL_ALREADY_IN_USE,
        })),
      );

      registerEffect(actions$, authServiceMock).subscribe((action) => {
        expect(action).toEqual(authActions.registerFailure({ backendError }));
        done();
      });
    });

    it('should redirect after "registerSuccess" action', (done) => {
      actions$ = of(
        authActions.registerSuccess({
          currentUser: {} as any,
        }),
      );

      redirectAfterRegisterEffect(actions$, routerMock).subscribe(() => {
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/home');
        done();
      });
    });
  });

  describe('Login effects', () => {
    it('should call login() and return the "loginSuccess" action', (done) => {
      const mockUser = { uid: '123' } as User;
      actions$ = of(
        authActions.login({
          email: 's',
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'login')
        .mockImplementationOnce(() => of(mockUser));

      loginEffect(actions$, authServiceMock).subscribe((action) => {
        expect(authServiceMock.login).toHaveBeenCalled();
        expect(action).toEqual(
          authActions.loginSuccess({ currentUser: mockUser }),
        );
        done();
      });
    });

    it('should return the "loginFailure" action with "userNotFound"', (done) => {
      const backendError = { userNotFound: true };
      actions$ = of(
        authActions.login({
          email: 's',
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'login')
        .mockImplementationOnce(() =>
          throwError(() => ({ code: AUTH.USER_NOT_FOUND })),
        );

      loginEffect(actions$, authServiceMock).subscribe((action) => {
        expect(action).toEqual(authActions.loginFailure({ backendError }));
        done();
      });
    });

    it('should return the "loginFailure" action with "invalidLoginCredentials"', (done) => {
      const backendError = { invalidLoginCredentials: true };
      actions$ = of(
        authActions.login({
          email: 's',
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'login')
        .mockImplementationOnce(() =>
          throwError(() => ({ code: AUTH.INVALID_LOGIN_CREDENTIALS })),
        );

      loginEffect(actions$, authServiceMock).subscribe((action) => {
        expect(action).toEqual(authActions.loginFailure({ backendError }));
        done();
      });
    });

    it('should return the "loginFailure" action with "invalidLoginCredentials" when invalid password', (done) => {
      const backendError = { invalidLoginCredentials: true };
      actions$ = of(
        authActions.login({
          email: 's',
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'login')
        .mockImplementationOnce(() =>
          throwError(() => ({ code: AUTH.INVALID_PASSWORD })),
        );

      loginEffect(actions$, authServiceMock).subscribe((action) => {
        expect(action).toEqual(authActions.loginFailure({ backendError }));
        done();
      });
    });

    it('should return the "loginFailure" action with "tooManyAttempts"', (done) => {
      const backendError = { tooManyAttempts: true };
      actions$ = of(
        authActions.login({
          email: 's',
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'login')
        .mockImplementationOnce(() =>
          throwError(() => ({ code: AUTH.TOO_MANY_ATTEMPTS })),
        );

      loginEffect(actions$, authServiceMock).subscribe((action) => {
        expect(action).toEqual(authActions.loginFailure({ backendError }));
        done();
      });
    });

    it('should return the "loginFailure" action with "authError"', (done) => {
      const backendError = { authError: true };
      actions$ = of(
        authActions.login({
          email: 's',
          password: '1',
        }),
      );

      jest
        .spyOn(authServiceMock, 'login')
        .mockImplementationOnce(() => throwError(() => ({ code: 'error' })));

      loginEffect(actions$, authServiceMock).subscribe((action) => {
        expect(action).toEqual(authActions.loginFailure({ backendError }));
        done();
      });
    });

    it('should redirect after "loginSuccess" action', (done) => {
      actions$ = of(
        authActions.loginSuccess({
          currentUser: {} as any,
        }),
      );

      redirectAfterLoginEffect(actions$, routerMock).subscribe(() => {
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/home');
        done();
      });
    });
  });

  describe('Logout effects', () => {
    it('should call logout() and return the "logoutSuccess" action', (done) => {
      actions$ = of(authActions.logout());

      jest
        .spyOn(authServiceMock, 'logout')
        .mockImplementationOnce(() => of(undefined));

      logoutEffect(actions$, authServiceMock).subscribe((action) => {
        expect(authServiceMock.logout).toHaveBeenCalled();
        expect(action).toEqual(authActions.logoutSuccess());
        done();
      });
    });

    it('should redirect after "logoutSuccess" action', (done) => {
      actions$ = of(authActions.logoutSuccess());

      redirectAfterLogoutEffect(actions$, routerMock).subscribe(() => {
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth/login');
        done();
      });
    });
  });

  describe('Get Current User effects', () => {
    it('should call getAuthState() and return the "getCurrentUserSuccess" action', (done) => {
      actions$ = of(authActions.getCurrentUser());

      jest
        .spyOn(authServiceMock, 'getAuthState')
        .mockImplementationOnce(() => of({} as User));

      getCurrentUserEffect(actions$, authServiceMock).subscribe((action) => {
        expect(authServiceMock.getAuthState).toHaveBeenCalled();
        expect(action).toEqual(
          authActions.getCurrentUserSuccess({ currentUser: {} as User }),
        );
        done();
      });
    });

    it('should call getAuthState() and return the "getCurrentUserSuccess" action', (done) => {
      actions$ = of(authActions.getCurrentUser());

      jest
        .spyOn(authServiceMock, 'getAuthState')
        .mockImplementationOnce(() => of(null));

      getCurrentUserEffect(actions$, authServiceMock).subscribe((action) => {
        expect(authServiceMock.getAuthState).toHaveBeenCalled();
        expect(action).toEqual(authActions.getCurrentUserFailure());
        done();
      });
    });
  });
});
