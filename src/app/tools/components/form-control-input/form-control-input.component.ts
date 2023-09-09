import { Component, Input } from '@angular/core';

@Component({
  selector: 'wdt-form-control-input',
  templateUrl: './form-control-input.component.html',
})
export class FormControlInputComponent {
  // TODO: Add character count to top right
  // TODO: Change outline color based on character number

  @Input({ required: true }) fieldName!: string;
  @Input() error: string | null = null;
  @Input() type: 'text' | 'number' | 'url' = 'text';
  @Input() isOptional: boolean = false;
}
