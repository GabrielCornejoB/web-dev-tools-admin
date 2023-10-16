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
  public isLoggedIn: Signal<boolean> = computed(() => !!this.user());

  constructor() {}

  public setUser(user: User) {
    this.user.set(user);
  }
  public removeUser() {
    this.user.set(null);
  }
}
