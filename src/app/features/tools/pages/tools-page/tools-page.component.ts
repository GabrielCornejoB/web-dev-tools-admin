import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components';

@Component({
  selector: 'wdt-tools-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './tools-page.component.html',
})
export class ToolsPageComponent {}
