import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CvaImplementation } from '@core/utils';

@Component({
  selector: 'wdt-autocomplete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent
  extends CvaImplementation
  implements AfterViewInit
{
  //* Dependency Injection
  private destroyRef = inject(DestroyRef);

  //* Attributes
  @Input({ required: true }) options: string[] = [];
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) hasError: boolean | null = null;
  @Input({ required: true }) errorText: string | null = null;

  @ViewChild('inputElement') element!: ElementRef<HTMLInputElement>;

  isMenuOpen: boolean = false;

  //* Lifecycle
  ngAfterViewInit(): void {
    fromEvent(this.element.nativeElement, 'keyup')
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(1000))
      .subscribe((e) => {
        const value = (e.target as HTMLInputElement).value;
        console.log(value);
      });
  }

  //* Functions
  onInputWrite(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }
  selectValue(value: string) {
    this.onChange(value);
  }
  onBlur() {
    if (!this.currentValue) this.onTouched();
  }
}
