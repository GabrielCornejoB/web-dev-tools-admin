import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';

import { User, UserCreateDto } from '@core/models';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //* Dependency Injection
  private auth = inject(Auth);
  private usersService = inject(UsersService);

  //* Functions
  /** Function to register a new User into Angular Auth */
  async register(dto: UserCreateDto, password: string): Promise<void> {
    const signUp = await createUserWithEmailAndPassword(
      this.auth,
      dto.email,
      password
    );
    await this.usersService.addUserToFirestore({
      email: dto.email,
      username: dto.username,
      isAdmin: false,
      uid: signUp.user.uid,
    });
  }

  /** Function to log-in already existing users */
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /** Function to logout users from the application */
  logout(): Promise<void> {
    return signOut(this.auth);
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
      })
    );
  }
}
