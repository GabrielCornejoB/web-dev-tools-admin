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

  readonly collectionName = 'users';

  getUserById(uid: string): Observable<User> {
    return defer(() =>
      from(getDocumentById<User>(this.firestore, this.collectionName, uid))
    );
  }

  addUserToFirestore(user: User) {
    const { uid, ...userWithoutId } = user;
    return setDoc(doc(this.firestore, this.collectionName, uid), {
      ...userWithoutId,
    });
  }
}
