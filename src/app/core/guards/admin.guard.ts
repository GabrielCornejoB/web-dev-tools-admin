import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';

/**
 * Guard that allows entering the Admin feature module
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn: boolean = authService.isLoggedIn();
  if (!isLoggedIn) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
