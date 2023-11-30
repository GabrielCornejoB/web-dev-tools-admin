import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[wdt-button]',
  standalone: true,
})
export class ButtonDirective implements OnChanges {
  @Input({ required: true }) variation: 'filled' | 'outlined' = 'filled';

  readonly outlinedButtonClasses =
    'border-1 border-base-200 py-3 text-base-300 transition-colors hover:border-white hover:text-white text-center';
  readonly filledButtonClasses =
    'bg-base-200 py-3 text-white transition-opacity hover:bg-opacity-75 disabled:cursor-not-allowed disabled:bg-opacity-50';

  constructor(private element: ElementRef) {}

  ngOnChanges(): void {
    this.element.nativeElement.className =
      this.variation === 'filled'
        ? this.filledButtonClasses
        : this.outlinedButtonClasses;
  }
}
