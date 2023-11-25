import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { authActions } from '@store/auth';

@Component({
  selector: 'wdt-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  private store = inject(Store);

  onClick() {
    this.store.dispatch(authActions.logout());
  }
}
