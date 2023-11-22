import { TestBed } from '@angular/core/testing';
import * as AngularFirestore from '@angular/fire/firestore';

import * as FirestoreUtils from '@core/utils/firestore.utils';
import { UsersService } from './users.service';

jest.mock('@angular/fire/firestore');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [AngularFirestore.Firestore],
    });

    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserById()', () => {
    it('should call getDocumentById()', (done) => {
      jest.spyOn(FirestoreUtils, 'getDocumentById').mockResolvedValue([]);
      const result = service.getUserById('12345');

      result.subscribe(() => {
        expect(FirestoreUtils.getDocumentById).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('addUserToFirestore()', () => {
    it('should call setDoc()', async () => {
      jest.spyOn(AngularFirestore, 'setDoc').mockResolvedValue({} as any);

      await service.addUserToFirestore({} as any);

      expect(AngularFirestore.setDoc).toHaveBeenCalled();
    });
  });
});
