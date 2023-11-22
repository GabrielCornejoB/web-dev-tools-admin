import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, defer, from } from 'rxjs';

import { User } from '@core/models';
import { getDocumentById } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //* Dependency Injection
  private firestore = inject(Firestore);

  //* Attributes
  readonly collectionName = 'users';

  //* Functions
  /**
   * Function to get the complete User's object
   * @param uid User uid property
   * @returns The user
   */
  getUserById(uid: string): Observable<User> {
    return defer(() =>
      from(getDocumentById<User>(this.firestore, this.collectionName, uid))
    );
  }

  /**
   * Function to create a User in firestore db when a new user is registered
   * @param user User object
   */
  addUserToFirestore(user: User): Promise<void> {
    const { uid, ...userWithoutId } = user;
    return setDoc(doc(this.firestore, this.collectionName, uid), {
      ...userWithoutId,
    });
  }
}
