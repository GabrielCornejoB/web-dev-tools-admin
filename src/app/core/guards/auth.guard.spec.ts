import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { AuthService } from '@core/services';
import { AuthServiceMock, RouterMock } from '@testing/mocks';
import { initGuard } from '@testing/setups';
import { authGuard } from './auth.guard';

describe('Auth - Guard', () => {
  let guard: Observable<boolean>;
  const authServiceMock: Partial<AuthService> = AuthServiceMock;
  const routerMock: Partial<Router> = RouterMock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    guard = initGuard(authGuard);

    expect(guard).toBeTruthy();
  });

  it('should return false and redirect if user is not logged in', (done) => {
    jest
      .spyOn(authServiceMock, 'getAuthState')
      .mockImplementationOnce(() => of(null));
    guard = initGuard(authGuard);

    guard.subscribe((result) => {
      expect(result).toBeFalsy();
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth/login');
      done();
    });
  });

  it('should return true if user is logged in', (done) => {
    jest
      .spyOn(authServiceMock, 'getAuthState')
      .mockImplementationOnce(() => of({} as User));
    guard = initGuard(authGuard);

    guard.subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
