import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NAV_LINKS } from '@core/constants';

/** Main layout component for the core og the application */
@Component({
  selector: 'wdt-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  links = NAV_LINKS;
}
