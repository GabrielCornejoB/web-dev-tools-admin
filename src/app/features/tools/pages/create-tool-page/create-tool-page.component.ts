import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'wdt-create-tool-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './create-tool-page.component.html',
})
export class CreateToolPageComponent {}
