import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'wdt-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) buttonText: string = '';
  @Input({ required: true }) redirectTo: string = '';
}
