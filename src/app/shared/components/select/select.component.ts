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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class SelectComponent implements AfterViewInit, ControlValueAccessor {
  //* Dependency Injection
  private destroyRef = inject(DestroyRef);

  //* Inputs
  @Input({ required: true }) options: string[] = [];
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) hasError: boolean | null = null;
  @Input({ required: true }) errorText: string | null = null;

  //* Attributes
  @ViewChild('selectContainer')
  selectContainer!: ElementRef<HTMLDivElement>;
  currentValue: string | null = null;
  isMenuOpen: boolean = false;
  onChange = (value: string) => {};
  onTouched = () => {};

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

  //* CVA Implementation
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
