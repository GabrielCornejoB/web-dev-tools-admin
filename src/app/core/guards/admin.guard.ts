import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';
import { map } from 'rxjs';

/**
 * Guard that allows logged in admin users to access the Admin module
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
    })
  );
};
