import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[wdt-label]',
  standalone: true,
})
export class LabelDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.className =
      'text-base-300 absolute -top-6 left-1 cursor-text text-sm transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:left-1 peer-focus:text-sm';
  }
}
