import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-control-select',
  templateUrl: './form-control-select.component.html',
})
export class FormControlSelectComponent {
  @Input({ required: true }) fieldName!: string;
  @Input() isOptional: boolean = false;
  @Input({ required: true }) options: string[] = [];
  @Input() error: string | null = null;
}
