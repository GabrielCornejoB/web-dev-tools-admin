import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';

export async function getDocuments<T>(
  firestore: Firestore,
  collectionName: string
): Promise<T[]> {
  const firestoreQuery = query(collection(firestore, collectionName));
  const querySnapshot = await getDocs(firestoreQuery);
  return querySnapshot.docs.map((doc) => doc.data() as T);
}

export async function getDocumentById<T>(
  firestore: Firestore,
  collectionName: string,
  id: string
): Promise<T> {
  const firestoreDoc = doc(firestore, collectionName, id);
  const documentSnapshot = await getDoc(firestoreDoc);
  return documentSnapshot.data() as T;
}
