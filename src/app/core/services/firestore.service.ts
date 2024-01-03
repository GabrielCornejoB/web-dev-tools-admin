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
import { Observable } from 'rxjs';

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
  getDocuments<T>(collectionName: string): Observable<T[]> {
    const request = async () => {
      const firestoreQuery = query(collection(this.firestore, collectionName));
      const querySnapshot = await getDocs(firestoreQuery);
      return querySnapshot.docs.map((doc) => doc.data() as T);
    };

    return toObservable(request());
  }

  /**
   * Retrieves a single document by its ID from a specified collection.
   * @param collectionName - The name of the Firestore collection.
   * @param id - The unique ID of the document to retrieve.
   * @returns An Observable containing the requested document of type T.
   */
  getDocumentById<T>(collectionName: string, id: string): Observable<T> {
    const request = async () => {
      const firestoreDoc = doc(this.firestore, collectionName, id);
      const documentSnapshot = await getDoc(firestoreDoc);
      return documentSnapshot.data() as T;
    };

    return toObservable(request());
  }

  /**
   * Creates a new document in a specified collection with an auto-generated ID.
   * @param collectionName - The name of the Firestore collection.
   * @param - The document to be added to the collection.
   * @returns An Observable that completes when the document is created.
   */
  createDocument<T extends {}>(
    collectionName: string,
    document: T,
  ): Observable<void> {
    const request = async () => {
      setDoc(doc(this.firestore, collectionName), document);
    };

    return toObservable(request());
  }

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
    const request = async () => {
      setDoc(doc(this.firestore, collectionName, id), document);
    };

    return toObservable(request());
  }
}
