import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as AngularFireAuth from '@angular/fire/auth';

import { UsersServiceMock } from 'src/tests/mocks/users-service.mock';
import { UserCreateDto } from '@core/models';
import { AuthService } from '../../../../app/core/services/auth.service';
import { UsersService } from '../../../../app/core/services/users.service';

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
    it('should call createUserWithEmailAndPassword() and addUserToFirestore()', (done) => {
      const userCredentialMock = { user: { uid: 'test' } };
      const dto: UserCreateDto = {
        email: 'test@mail.com',
        username: 'testUser',
      };
      const password = '1234567';

      jest
        .spyOn(usersServiceMock, 'addUserToFirestore')
        .mockImplementation(() => of({} as any));
      jest
        .spyOn(AngularFireAuth, 'createUserWithEmailAndPassword')
        .mockResolvedValue(userCredentialMock as any);

      service.register(dto, password).subscribe(() => {
        expect(
          AngularFireAuth.createUserWithEmailAndPassword,
        ).toHaveBeenCalled();
        expect(usersServiceMock.addUserToFirestore).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('login()', () => {
    it('should call signInWithEmailAndPassword()', (done) => {
      const userCredentialMock = { user: { uid: 'test' } };
      const email = 'test@mail.com';
      const password = '1234567';

      jest
        .spyOn(AngularFireAuth, 'signInWithEmailAndPassword')
        .mockResolvedValue(userCredentialMock as any);

      service.login(email, password).subscribe(() => {
        expect(AngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('logout()', () => {
    it('should call signOut()', (done) => {
      jest.spyOn(AngularFireAuth, 'signOut').mockResolvedValue();

      service.logout().subscribe(() => {
        expect(AngularFireAuth.signOut).toHaveBeenCalled();
        done();
      });
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
