import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCurrentUser } from '@store/auth';
import { ButtonDirective } from '@shared/directives';

/**
 * Header component used as the sub-header of some pages, comes with the title and a redirect button
 */
@Component({
  selector: 'wdt-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonDirective],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  //* Dependency Injection
  private store = inject(Store);

  //* Inputs
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) buttonText: string = '';
  @Input({ required: true }) redirectTo: string = '';

  //* Attributes
  currentUser$ = this.store.select(selectCurrentUser);
}
