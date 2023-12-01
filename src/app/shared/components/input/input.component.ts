import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** Custom Input component, has incorporated error label, meant to be used with Reactive Forms */
@Component({
  selector: 'wdt-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  //* Inputs
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) labelText: string = '';
  @Input({ required: true }) hasError: boolean | null = null;
  @Input({ required: true }) errorText: string | null = null;
  @Input() type: 'text' | 'password' = 'text';

  //* Attributes
  value: string = '';
  isVisible: boolean = false;
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
