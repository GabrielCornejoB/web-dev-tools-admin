import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { map } from 'rxjs';

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
