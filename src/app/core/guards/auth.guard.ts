import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '@core/services';

/**
 * Guard that allows logged in users to access certain pages of the application
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthState().pipe(
    map((user) => {
      if (!user) {
        router.navigateByUrl('/auth/login');
        return false;
      }
      return true;
    })
  );
};
