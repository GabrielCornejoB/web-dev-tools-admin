import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CvaImplementation } from '@core/utils';

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
export class InputComponent extends CvaImplementation {
  //* Attributes
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) labelText: string = '';
  @Input({ required: true }) hasError: boolean | null = null;
  @Input({ required: true }) errorText: string | null = null;
  @Input() type: 'text' | 'password' = 'text';

  isVisible: boolean = false;

  //* Functions
  onInputWrite(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.onChange(val);
  }
  onBlur() {
    if (!this.currentValue) this.onTouched();
  }
}
