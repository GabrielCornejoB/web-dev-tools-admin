import { ElementRefMock } from '@testing/mocks';
import { InputDirective } from './input.directive';
import { ElementRef } from '@angular/core';

describe('Input - Directive', () => {
  const elementRefMock: Partial<ElementRef> = ElementRefMock;
  it('should create an instance', () => {
    const directive = new InputDirective(elementRefMock as ElementRef);
    expect(directive).toBeTruthy();
  });

  it('should set the normal color classes when "hasError" is false', () => {
    const directive = new InputDirective(elementRefMock as ElementRef);
    directive.hasError = false;

    directive.ngOnChanges();

    expect(elementRefMock.nativeElement.className).toContain(
      directive.colorClasses,
    );
    expect(elementRefMock.nativeElement.className).not.toContain(
      directive.errorColorClasses,
    );
  });

  it('should set error classes when "hasError" is true', () => {
    const directive = new InputDirective(elementRefMock as ElementRef);
    directive.hasError = true;

    directive.ngOnChanges();

    expect(elementRefMock.nativeElement.className).toContain(
      directive.errorColorClasses,
    );
    expect(elementRefMock.nativeElement.className).not.toContain(
      directive.colorClasses,
    );
  });
});
