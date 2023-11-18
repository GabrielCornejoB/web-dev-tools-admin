import { Router } from '@angular/router';

import { publicGuard } from './public.guard';
import { AuthService } from '@core/services';
import { AuthServiceMock, RouterMock } from '@testing/mocks';
import { initGuard } from '@testing/setups';
import { Observable, of } from 'rxjs';
import { User } from '@angular/fire/auth';

describe('Public - Guard', () => {
  let guard: Observable<boolean>;
  const authServiceMock: Partial<AuthService> = AuthServiceMock;
  const routerMock: Partial<Router> = RouterMock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    guard = initGuard(publicGuard);

    expect(guard).toBeTruthy();
  });

  it('should return false and redirect if user is logged in', (done) => {
    jest
      .spyOn(authServiceMock, 'getAuthState')
      .mockImplementationOnce(() => of({} as User));
    guard = initGuard(publicGuard);

    guard.subscribe((result) => {
      expect(result).toBeFalsy();
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/admin');
      done();
    });
  });

  it('should return true if user is not logged in', (done) => {
    jest
      .spyOn(authServiceMock, 'getAuthState')
      .mockImplementationOnce(() => of(null));
    guard = initGuard(publicGuard);

    guard.subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
