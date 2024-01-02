import { Injectable } from '@angular/core';
import {
  Auth,
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
  constructor(
    private auth: Auth,
    private usersService: UsersService,
  ) {}

  //* Functions
  /** Function to register a new User into Angular Auth */
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
  login(email: string, password: string): Observable<User> {
    return toObservable(
      signInWithEmailAndPassword(this.auth, email, password),
    ).pipe(switchMap(({ user }) => this.usersService.getUserById(user.uid)));
  }

  /** Function to logout users from the application */
  logout(): Observable<void> {
    return toObservable(signOut(this.auth));
  }

  /**
   * Function to get the current Authentication State on the application
   * @returns The authenticated User or null if there's no authenticated user
   */
  getAuthState(): Observable<User | null> {
    return authState(this.auth).pipe(
      switchMap((data) => {
        if (data) return this.usersService.getUserById(data.uid);
        return of(null);
      }),
    );
  }
}
