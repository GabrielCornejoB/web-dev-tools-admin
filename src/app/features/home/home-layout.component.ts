import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wdt-home-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent {}
