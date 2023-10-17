import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '@core/services';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wdt-admin-layout',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);

  public logout(): void {
    this.authService.removeUser();
  }
}
