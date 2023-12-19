import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
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
  @Input() hasButton: boolean = false;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter();

  @ViewChild('inputElement') element!: ElementRef<HTMLInputElement>;
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  isMenuOpen: boolean = false;
  filteredOptions: string[] = [];

  //* Lifecycle
  ngOnInit(): void {
    this.filteredOptions = this.options;
  }
  ngAfterViewInit(): void {
    this.subscribeToClickOutsideOfElement();
  }

  //* Functions
  onInputWrite() {
    if (this.currentValue !== null) {
      this.onChange(this.currentValue);

      const value = this.currentValue.toLowerCase();
      this.filteredOptions = this.filterOptions(value);
      return;
    }
    this.onChange('');
    this.filteredOptions = [...this.options];
  }
  selectOption(option: string) {
    this.onChange(option);
    this.currentValue = option;
    this.filteredOptions = this.filterOptions(option);
    this.isMenuOpen = false;
  }
  emitValue() {
    if (this.currentValue) this.buttonClicked.emit(this.currentValue);
    this.onChange('');
    this.currentValue = '';
    this.filteredOptions = [...this.options];
    this.isMenuOpen = false;
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
  filterOptions(param: string) {
    return this.options.filter((opt) => opt.toLowerCase().startsWith(param));
  }
}
