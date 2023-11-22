import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as AngularFireAuth from '@angular/fire/auth';
import * as AngularFirestore from '@angular/fire/firestore';

import { UsersServiceMock } from '@testing/mocks/users-service.mock';
import { User, UserCreateDto } from '@core/models';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

jest.mock('@angular/fire/firestore');
jest.mock('@angular/fire/auth');

describe('Auth - Service', () => {
  let service: AuthService;
  let usersServiceMock: Partial<UsersService> = UsersServiceMock;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        AngularFirestore.Firestore,
        AngularFireAuth.Auth,
        { provide: UsersService, useValue: UsersServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register()', () => {
    it('should call createUserWithEmailAndPassword() and addUserToFirestore()', async () => {
      const userCredentialMock = { user: { uid: 'test' } };
      const dto: UserCreateDto = {
        email: 'test@mail.com',
        username: 'testUser',
      };
      const password = '1234567';

      jest.spyOn(usersServiceMock, 'addUserToFirestore').mockResolvedValue();
      jest
        .spyOn(AngularFireAuth, 'createUserWithEmailAndPassword')
        .mockResolvedValue(userCredentialMock as any);
      await service.register(dto, password);

      expect(AngularFireAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(usersServiceMock.addUserToFirestore).toHaveBeenCalled();
    });
  });

  describe('login()', () => {
    it('should call signInWithEmailAndPassword()', async () => {
      const resultMock = 'test';
      const email = 'test@mail.com';
      const password = '1234567';

      jest
        .spyOn(AngularFireAuth, 'signInWithEmailAndPassword')
        .mockResolvedValue(resultMock as any);
      await service.login(email, password);

      expect(AngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('should call signOut()', async () => {
      jest.spyOn(AngularFireAuth, 'signOut').mockResolvedValue();
      await service.logout();

      expect(AngularFireAuth.signOut).toHaveBeenCalled();
    });
  });

  describe('getAuthState()', () => {
    it('should call authState() and return null if the user is not logged in', (done) => {
      jest
        .spyOn(AngularFireAuth, 'authState')
        .mockImplementation(() => of(null));
      service.getAuthState().subscribe(() => {
        expect(AngularFireAuth.authState).toHaveBeenCalled();
        done();
      });
    });

    it('should call authState() and call getUserById() if user is logged in', (done) => {
      jest.spyOn(usersServiceMock, 'getUserById');
      jest
        .spyOn(AngularFireAuth, 'authState')
        .mockImplementation(() => of({ data: 'test' } as any));
      service.getAuthState().subscribe((data) => {
        expect(AngularFireAuth.authState).toHaveBeenCalled();
        expect(usersServiceMock.getUserById).toHaveBeenCalled();
        done();
      });
    });
  });
});
