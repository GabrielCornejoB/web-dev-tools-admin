import { ControlValueAccessor } from '@angular/forms';

export class CvaImplementation implements ControlValueAccessor {
  //* Attributes
  currentValue: string | null = null;
  onChange = (value: string) => {};
  onTouched = () => {};

  //* Functions
  writeValue(value: string): void {
    this.currentValue = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
