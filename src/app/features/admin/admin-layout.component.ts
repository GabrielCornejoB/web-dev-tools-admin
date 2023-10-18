import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '@core/services';

import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'wdt-admin-layout',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public logout(): void {
    this.authService
      .logout()
      .then(() => this.router.navigateByUrl('/auth/login'));
  }
}
