import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';
import { map } from 'rxjs';

/**
 * Guard that doesn't allows logged in users to access the authentication pages of the application
 */
export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthState().pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl('/admin');
        return false;
      }
      return true;
    })
  );
};
