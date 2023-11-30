import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wdt-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
})
export class TextareaComponent {
  //* Inputs
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) labelText: string = '';
  @Input({ required: true }) hasError: boolean | null = null;
  @Input({ required: true }) errorText: string | null = null;
  @Input() numberOfLines: number = 3;

  //* Attributes
  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  //* Functions
  onInputWrite(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.onChange(val);
  }
  onBlur() {
    if (!this.value) this.onTouched();
  }

  //* CVA Implementation
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
