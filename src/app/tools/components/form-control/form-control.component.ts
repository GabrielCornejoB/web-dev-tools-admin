import { Component, Input } from '@angular/core';

@Component({
  selector: 'wdt-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent {
  @Input({ required: true }) fieldName!: string;
  @Input() error: string | null = null;
  @Input() isOptional: boolean = false;
}
