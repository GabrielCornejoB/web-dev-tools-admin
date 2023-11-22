import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'wdt-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
