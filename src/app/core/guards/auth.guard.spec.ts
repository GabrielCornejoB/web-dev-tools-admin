import { TestBed } from '@angular/core/testing';
import { CanActivateFn, RouterModule, provideRouter } from '@angular/router';

import { authGuard } from './auth.guard';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '@env/environment';
import { AuthService } from '@core/services';

describe('Auth - Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
      providers: [AuthService, provideRouter([])],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
