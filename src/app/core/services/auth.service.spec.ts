import { TestBed } from '@angular/core/testing';
import * as AngularFireAuth from '@angular/fire/auth';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { of } from 'rxjs';

import { environment } from '@env/environment';
import { AuthService } from './auth.service';

describe('Auth - Service', () => {
  let service: AuthService;
  let auth: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    auth = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register()', () => {
    it('should call createUserWithEmailAndPassword()', async () => {
      const testResult = 'test';
      const email = 'test@mail.com';
      const password = '123456';

      jest
        .spyOn(AngularFireAuth, 'createUserWithEmailAndPassword')
        .mockResolvedValue(testResult as any);
      const result = await service.register(email, password);

      expect(
        AngularFireAuth.createUserWithEmailAndPassword
      ).toHaveBeenCalledWith(auth, email, password);
      expect(result).toEqual(testResult);
    });
  });

  describe('login()', () => {
    it('should call signInWithEmailAndPassword()', async () => {
      const testResult = 'test';
      const email = 'test@mail.com';
      const password = '123456';

      jest
        .spyOn(AngularFireAuth, 'signInWithEmailAndPassword')
        .mockResolvedValue(testResult as any);
      const result = await service.login(email, password);

      expect(AngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password
      );
      expect(result).toEqual(testResult);
    });
  });

  describe('logout()', () => {
    it('should call signOut()', async () => {
      jest.spyOn(AngularFireAuth, 'signOut').mockResolvedValue();
      await service.logout();

      expect(AngularFireAuth.signOut).toHaveBeenCalledWith(auth);
    });
  });

  describe('getAuthState()', () => {
    it('should call authState()', (done) => {
      jest
        .spyOn(AngularFireAuth, 'authState')
        .mockImplementation(() => of(null));
      service.getAuthState().subscribe(() => {
        expect(AngularFireAuth.authState).toHaveBeenCalledWith(auth);
        done();
      });
    });
  });
});
