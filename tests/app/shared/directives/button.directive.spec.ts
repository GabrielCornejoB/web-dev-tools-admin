import { ElementRef } from '@angular/core';

import { ButtonDirective } from '@shared/directives';
import { ElementRefMock } from '@tests/mocks';

describe('ButtonDirective', () => {
  let directive: ButtonDirective;
  const elementRefMock = ElementRefMock as ElementRef;

  beforeEach(() => {
    directive = new ButtonDirective(elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the outlined classes when the "variation" attr is "outlined"', () => {
    directive.variation = 'outlined';

    directive.ngOnChanges();

    expect(elementRefMock.nativeElement.className).toContain(
      directive.outlinedButtonClasses,
    );
  });

  it('should set the filled classes when the "variation" attr is "filled"', () => {
    directive.variation = 'filled';

    directive.ngOnChanges();

    expect(elementRefMock.nativeElement.className).toContain(
      directive.filledButtonClasses,
    );
  });
});
