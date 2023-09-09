import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-control-input',
  templateUrl: './form-control-input.component.html',
})
export class FormControlInputComponent {
  @Input({ required: true }) fieldName!: string;
  @Input() error: string | null = null;
  @Input() type: string = 'text';
  @Input() isOptional: boolean = false;
}
