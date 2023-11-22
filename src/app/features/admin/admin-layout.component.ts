import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '@core/services';

@Component({
  selector: 'wdt-admin-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  //* Dependency Injection
  private authService = inject(AuthService);
  private router = inject(Router);

  //* Core Functions
  logout(): void {
    this.authService
      .logout()
      .then(() => this.router.navigateByUrl('/auth/login'));
  }
}
