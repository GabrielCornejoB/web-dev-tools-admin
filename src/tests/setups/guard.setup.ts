import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { AuthServiceMock, RouterMock } from 'src/tests/mocks';
import { AuthService } from '@core/services';
import { environment } from '@env/environment';

/**
 * Guard initializator function to reduce code in the Guards Unit tests
 * @param canActivateGuard Guard to be initialized
 * @returns The result of the guard
 */
export const initGuard = (canActivateGuard: CanActivateFn) => {
  TestBed.configureTestingModule({
    imports: [
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
    ],
    providers: [
      canActivateGuard,
      { provide: AuthService, useValue: AuthServiceMock },
      { provide: Router, useValue: RouterMock },
    ],
  });
  return TestBed.runInInjectionContext(() =>
    canActivateGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
  ) as Observable<boolean>;
};
