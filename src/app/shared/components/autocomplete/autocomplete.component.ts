import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CvaImplementation } from '@core/utils';

@Component({
  selector: 'wdt-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  implements OnInit, AfterViewInit
{
  //* Dependency Injection
  private destroyRef = inject(DestroyRef);

  //* Attributes
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) options: string[] = [];
  @Input({ required: true }) labelText: string = '';
  @Input({ required: true }) hasError: boolean | null = null;
  @Input({ required: true }) errorText: string | null = null;

  @ViewChild('inputElement') element!: ElementRef<HTMLInputElement>;
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  isMenuOpen: boolean = false;
  filteredOptions: string[] = [];

  //* Lifecycle
  ngOnInit(): void {
    this.filteredOptions = this.options;
  }
  ngAfterViewInit(): void {
    this.subscribeToFilterOptions();
    this.subscribeToClickOutsideOfElement();
  }

  //* Functions
  onInputWrite() {
    if (this.currentValue !== null) this.onChange(this.currentValue);
  }
  selectOption(value: string) {
    this.isMenuOpen = false;
    this.currentValue = value;
    this.onChange(value);
  }
  subscribeToFilterOptions() {
    fromEvent(this.element.nativeElement, 'keyup')
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100))
      .subscribe((e) => {
        const value = (e.target as HTMLInputElement).value;
        this.filteredOptions = value
          ? this.options.filter((o) => o.startsWith(value))
          : [...this.options];
      });
  }
  subscribeToClickOutsideOfElement() {
    fromEvent(document, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        if (
          !this.container.nativeElement.contains(e.target as Node) &&
          this.isMenuOpen
        ) {
          this.isMenuOpen = !this.isMenuOpen;
          this.onTouched();
        }
      });
  }
}
