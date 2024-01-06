import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { toObservable } from '@core/utils';
import { Observable, filter, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  /**
   * Retrieves an array of documents from a specified collection.
   * @param collectionName - The name of the Firestore collection.
   * @returns An Observable containing an array of documents of type T.
   */
  getDocuments<T>(collectionName: string): Observable<T[] | null> {
    const request = async () => {
      const firestoreQuery = query(collection(this.firestore, collectionName));
      const querySnapshot = await getDocs(firestoreQuery);
      const docsData = querySnapshot.docs.map((doc) => doc.data());
      return (docsData as T[]) || null;
    };

    return toObservable(request());
  }

  /**
   * Retrieves a single document by its ID from a specified collection.
   * @param collectionName - The name of the Firestore collection.
   * @param id - The unique ID of the document to retrieve.
   * @returns An Observable containing the requested document of type T.
   */
  getDocumentById<T>(collectionName: string, id: string): Observable<T | null> {
    const request = async () => {
      const firestoreDoc = doc(this.firestore, collectionName, id);
      const documentSnapshot = await getDoc(firestoreDoc);
      const docData = documentSnapshot.data();
      return (docData as T) || null;
    };

    return toObservable(request());
  }

  //TODO Make it that it returns the user
  /**
   * Creates a new document with a specified ID in a collection.
   * @param collectionName - The name of the Firestore collection.
   * @param document - The document to be added to the collection.
   * @param id - The ID to assign to the new document.
   * @returns An Observable that completes when the document is created.
   */
  createDocumentWithId<T extends {}>(
    collectionName: string,
    document: T,
    id: string,
  ): Observable<void> {
    return this.getDocumentById<T>(collectionName, id).pipe(
      map((res) => {
        if (res !== null) return res;
        return throwError(() => 'Document already exists');
      }),
      switchMap(() => {
        const request = async () => {
          await setDoc(doc(this.firestore, collectionName, id), document);
        };

        return toObservable(request());
      }),
    );
  }
}
