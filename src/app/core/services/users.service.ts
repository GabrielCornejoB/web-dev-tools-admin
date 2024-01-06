import { Injectable } from '@angular/core';
import { deleteUser, User as FireUser } from '@angular/fire/auth';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';

import { User } from '@core/models';
import { FirestoreService } from './firestore.service';
import { toObservable } from '../utils/async.utils';

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
  getUserById(uid: string): Observable<User | null> {
    return this.firestoreService.getDocumentById<User>(
      this.collectionName,
      uid,
    );
  }

  /**
   * Function to create a User in firestore db when a new user is registered
   * @param user User object
   */
  addUserToFirestore(user: User, fireuser: FireUser): Observable<User> {
    const { uid, ...userWithoutId } = user;

    return this.firestoreService
      .createDocumentWithId(this.collectionName, userWithoutId, uid)
      .pipe(
        map(() => user),
        catchError(() => toObservable(deleteUser(fireuser))),
        switchMap((user) => {
          if (!!user) return of(user);
          return throwError(() => ({ code: 'AUTH_ERROR' }));
        }),
      );
  }
}
