import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AutocompleteComponent,
  HeaderComponent,
  InputComponent,
  SelectComponent,
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
    SelectComponent,
    AutocompleteComponent,
    ButtonDirective,
  ],
  templateUrl: './create-tool-page.component.html',
})
export class CreateToolPageComponent {}
