import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-control-textarea',
  templateUrl: './form-control-textarea.component.html',
})
export class FormControlTextareaComponent {
  @Input({ required: true }) fieldName!: string;
  @Input() error: string | null = null;
  @Input() isOptional: boolean = false;
}
