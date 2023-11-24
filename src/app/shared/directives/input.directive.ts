import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[wdt-input]',
  standalone: true,
})
export class InputDirective implements OnChanges {
  @Input({ required: true })
  hasError: boolean | null = null;

  readonly colorClasses =
    'border-base-200 outline-base-200 focus:outline-base-200';
  readonly errorColorClasses = 'border-red-400 focus:outline-red-400';
  readonly styles =
    'border-1 peer w-full bg-transparent p-3 text-white placeholder:invisible focus:outline-none focus:outline-2 focus:outline-offset-2';

  constructor(private element: ElementRef) {
    this.element.nativeElement.className = this.styles + this.colorClasses;
    this.element.nativeElement.placeholder = 'placeholder';
  }
  ngOnChanges(): void {
    this.element.nativeElement.className = `${this.styles} ${
      this.hasError ? this.errorColorClasses : this.colorClasses
    }`;
  }
}
