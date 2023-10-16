import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn: boolean = authService.isLoggedIn();
  if (!isLoggedIn) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
