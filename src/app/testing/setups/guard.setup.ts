import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { AuthService } from '@core/services';
import { environment } from '@env/environment';
import { AuthServiceMock, RouterMock } from '@testing/mocks';
import { Observable } from 'rxjs';

export const initGuard = (canActivateGuard: CanActivateFn) => {
  TestBed.configureTestingModule({
    imports: [
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
    ],
    providers: [
      authGuard,
      { provide: AuthService, useValue: AuthServiceMock },
      { provide: Router, useValue: RouterMock },
    ],
  });
  return TestBed.runInInjectionContext(() =>
    canActivateGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
  ) as Observable<boolean>;
};
