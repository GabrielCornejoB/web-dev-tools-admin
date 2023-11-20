import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //* Dependency Injection
  private auth = inject(Auth);

  //* Functions
  /** Function to register a new User into Angular Auth */
  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
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
    return authState(this.auth);
  }
}
