import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  InputComponent,
  TextareaComponent,
} from '@shared/components';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'wdt-create-tool-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    InputComponent,
    TextareaComponent,
    ButtonDirective,
  ],
  templateUrl: './create-tool-page.component.html',
})
export class CreateToolPageComponent {}
