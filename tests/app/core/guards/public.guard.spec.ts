import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '@core/services';
import { publicGuard } from '@core/guards';
import { AuthServiceMock, RouterMock } from '@tests/mocks';
import { initGuard } from '@tests/setups';

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
      .mockImplementationOnce(() => of({} as any));
    guard = initGuard(publicGuard);

    guard.subscribe((result) => {
      expect(result).toBeFalsy();
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/home');
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
