import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '@core/services';

@Component({
  selector: 'wdt-admin-layout',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
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
