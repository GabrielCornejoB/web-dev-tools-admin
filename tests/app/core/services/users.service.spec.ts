import { FirestoreService, UsersService } from '@core/services';
import { FirestoreServiceMock } from '@tests/mocks';
import { of } from 'rxjs';

jest.mock('@angular/fire/firestore');

describe('Users - Service', () => {
  let service: UsersService;
  let firestoreService: FirestoreService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    firestoreService = FirestoreServiceMock;
    service = new UsersService(firestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserById()', () => {
    it('should call getDocumentById()', (done) => {
      jest
        .spyOn(firestoreService, 'getDocumentById')
        .mockImplementation(() => of([]));
      const result = service.getUserById('12345');

      result.subscribe(() => {
        expect(firestoreService.getDocumentById).toHaveBeenCalledWith(
          'users',
          '12345',
        );
        done();
      });
    });
  });

  describe('addUserToFirestore()', () => {
    it('should call setDoc()', (done) => {
      jest
        .spyOn(firestoreService, 'createDocumentWithId')
        .mockImplementation(() => of({} as any));

      service.addUserToFirestore({} as any).subscribe(() => {
        expect(firestoreService.createDocumentWithId).toHaveBeenCalled();
        done();
      });
    });
  });
});
