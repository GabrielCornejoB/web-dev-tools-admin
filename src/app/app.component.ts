import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '@store/auth';

@Component({
  selector: 'wdt-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    console.log('uwu');
    this.store.dispatch(authActions.getCurrentUser());
  }
}
