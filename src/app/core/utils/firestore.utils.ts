import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';

/**
 * Utility function to get documents from firestore
 * @param firestore Firestore injection
 * @param collectionName Name of the collection to search the documents
 * @returns Document array
 */
export async function getDocuments<T>(
  firestore: Firestore,
  collectionName: string
): Promise<T[]> {
  const firestoreQuery = query(collection(firestore, collectionName));
  const querySnapshot = await getDocs(firestoreQuery);
  return querySnapshot.docs.map((doc) => doc.data() as T);
}

/**
 * Utility function to get a single document from firestore
 * @param firestore Firestore injection
 * @param collectionName Nanme of the collection to search the document
 * @param id uid of the document
 * @returns Document
 */
export async function getDocumentById<T>(
  firestore: Firestore,
  collectionName: string,
  id: string
): Promise<T> {
  const firestoreDoc = doc(firestore, collectionName, id);
  const documentSnapshot = await getDoc(firestoreDoc);
  return documentSnapshot.data() as T;
}
