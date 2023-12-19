import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  Firestore,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import * as AngularFirestore from '@angular/fire/firestore';

import { environment } from '@env/environment';
import {
  getDocumentById,
  getDocuments,
} from '../../../../app/core/utils/firestore.utils';

describe('Firestore - Utils', () => {
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    firestore = TestBed.inject(Firestore);
  });

  describe('getDocument()', () => {
    it('should call getDocs() from firestore', async () => {
      jest
        .spyOn(AngularFirestore, 'getDocs')
        .mockResolvedValue({ docs: [{ data: jest.fn() }] } as any);

      await getDocuments(firestore, 'test');

      expect(AngularFirestore.getDocs).toHaveBeenCalled();
    });
  });

  describe('getDocumentById', () => {
    it('should call getDoc() from firestore', async () => {
      jest
        .spyOn(AngularFirestore, 'getDoc')
        .mockResolvedValue({ data: jest.fn() } as any);

      await getDocumentById(firestore, 'test', 'testid');

      expect(AngularFirestore.getDoc).toHaveBeenCalled();
    });
  });
});
