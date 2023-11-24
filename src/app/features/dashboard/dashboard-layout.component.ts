import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'wdt-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  async onClick() {
    await this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
