import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '@core/services';
import { User } from '@core/models';
import { adminGuard } from '@core/guards';
import { AuthServiceMock, RouterMock } from '@tests/mocks';
import { initGuard } from '@tests/setups';

describe('Admin - Guard', () => {
  let guard: Observable<boolean>;
  const authServiceMock: Partial<AuthService> = AuthServiceMock;
  const routerMock: Partial<Router> = RouterMock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    guard = initGuard(adminGuard);

    expect(guard).toBeTruthy();
  });

  it('should return false and redirect if user is not admin', (done) => {
    const userMock: User = {
      uid: '',
      isAdmin: false,
      email: '',
      username: '',
    };

    jest
      .spyOn(authServiceMock, 'getAuthState')
      .mockImplementationOnce(() => of(userMock));
    guard = initGuard(adminGuard);

    guard.subscribe((result) => {
      expect(result).toBeFalsy();
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/home');
      done();
    });
  });

  it('should return true if user is admin', (done) => {
    const userMock: User = {
      uid: '',
      isAdmin: true,
      email: '',
      username: '',
    };

    jest
      .spyOn(authServiceMock, 'getAuthState')
      .mockImplementationOnce(() => of(userMock));
    guard = initGuard(adminGuard);

    guard.subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
