import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { User } from '@core/models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestoreService: FirestoreService) {}

  //* Attributes
  readonly collectionName = 'users';

  //* Functions
  /**
   * Function to get the complete User's object
   * @param uid User uid property
   * @returns The user
   */
  getUserById(uid: string): Observable<User> {
    return this.firestoreService.getDocumentById<User>(
      this.collectionName,
      uid,
    );
  }

  /**
   * Function to create a User in firestore db when a new user is registered
   * @param user User object
   */
  addUserToFirestore(user: User): Observable<User> {
    const { uid, ...userWithoutId } = user;

    return this.firestoreService
      .createDocumentWithId(this.collectionName, userWithoutId, uid)
      .pipe(map(() => user));
  }
}
