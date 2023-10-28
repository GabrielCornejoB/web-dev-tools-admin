import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';
import { map } from 'rxjs';

// TODO: Documentation
export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authState$.pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl('/admin');
        return false;
      }
      return true;
    })
  );
};
