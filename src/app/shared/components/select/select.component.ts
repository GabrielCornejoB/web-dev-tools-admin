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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CvaImplementation } from '@core/utils';

/** Custom Dropdown select form field, uses the CVA interface, meant to be used with reactive forms */
@Component({
  selector: 'wdt-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  extends CvaImplementation
  implements AfterViewInit
{
  constructor(private destroyRef: DestroyRef) {
    super();
  }

  //* Attributes
  @Input({ required: true }) options: string[] = [];
  @Input({ required: true }) labelText: string = '';
  @Input({ required: true }) hasError: boolean | null = null;
  @Input({ required: true }) errorText: string | null = null;

  @ViewChild('selectContainer') selectContainer!: ElementRef<HTMLDivElement>;

  isMenuOpen: boolean = false;

  //* Lifecycle
  ngAfterViewInit(): void {
    this.subscribeToClickOutsideOfSelect();
  }

  //* Functions
  selectOption(value: string): void {
    this.currentValue = value;
    this.isMenuOpen = false;
    this.onChange(value);
  }
  subscribeToClickOutsideOfSelect(): void {
    fromEvent(document, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        if (
          !this.selectContainer.nativeElement.contains(e.target as Node) &&
          this.isMenuOpen
        ) {
          this.isMenuOpen = !this.isMenuOpen;
          this.onTouched();
        }
      });
  }
}
