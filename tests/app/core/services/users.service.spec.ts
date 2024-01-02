import * as AngularFirestore from '@angular/fire/firestore';
import { UsersService } from '@core/services';

import * as FirestoreUtils from '@core/utils/firestore.utils';

jest.mock('@angular/fire/firestore');

describe('Users - Service', () => {
  let service: UsersService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    service = new UsersService({} as any);
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
    it('should call setDoc()', (done) => {
      jest.spyOn(AngularFirestore, 'setDoc').mockResolvedValue({} as any);

      service.addUserToFirestore({} as any).subscribe(() => {
        expect(AngularFirestore.setDoc).toHaveBeenCalled();
        done();
      });
    });
  });
});
