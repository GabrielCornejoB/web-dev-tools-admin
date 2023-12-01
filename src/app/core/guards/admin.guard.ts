import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '@core/services';

/**
 * Guard that allows logged in admin users to access Pages that require Admin permissions
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthState().pipe(
    map((user) => {
      if (!user || !user.isAdmin) {
        router.navigateByUrl('/home');
        return false;
      }
      return true;
    }),
  );
};
