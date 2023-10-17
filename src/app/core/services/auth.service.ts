import {
  Injectable,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: WritableSignal<User | null> = signal(null);
  /** Computed signal that returns the current login status of the user */
  public isLoggedIn: Signal<boolean> = computed(() => !!this.user());

  constructor() {}

  /**
   * Function that sets the logged User into a global signal that then
   * has a computed signal that globally shares the log in status
   * @param user User object to login
   */
  public setUser(user: User): void {
    this.user.set(user);
  }
  /**
   * Function that sets the logged user to null, so the public computed
   * signal ('isLoggedIn') will be false
   */
  public removeUser(): void {
    this.user.set(null);
  }
}
