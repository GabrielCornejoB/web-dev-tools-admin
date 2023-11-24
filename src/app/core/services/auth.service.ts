import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';

import { User, UserCreateDto } from '@core/models';
import { UsersService } from './users.service';
import { toObservable } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //* Dependency Injection
  private auth = inject(Auth);
  private usersService = inject(UsersService);

  //* Functions
  /** Function to register a new User into Angular Auth */
  //! Fix Unit Tests
  register(dto: UserCreateDto, password: string): Observable<User> {
    return toObservable(
      createUserWithEmailAndPassword(this.auth, dto.email, password),
    ).pipe(
      switchMap(({ user }) =>
        this.usersService.addUserToFirestore({
          email: dto.email,
          username: dto.username,
          isAdmin: false,
          uid: user.uid,
        }),
      ),
      switchMap(({ uid }) => this.usersService.getUserById(uid)),
    );
  }

  /** Function to log-in already existing users */
  //! Fix Unit Tests
  login(email: string, password: string): Observable<UserCredential> {
    return toObservable(signInWithEmailAndPassword(this.auth, email, password));
  }

  /** Function to logout users from the application */
  //! Fix Unit Tests
  logout(): Observable<void> {
    return toObservable(signOut(this.auth));
  }

  /**
   * Function to get the current Authentication State on the application
   * @returns The authenticated User or null if there's no authenticated user
   */
  //! Fix Unit Tests
  getAuthState(): Observable<User | null> {
    return authState(this.auth).pipe(
      switchMap((data) => {
        if (data) return this.usersService.getUserById(data.uid);
        return of(null);
      }),
    );
  }
}
