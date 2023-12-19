import { ElementRef } from '@angular/core';
import { ButtonDirective } from '../../../../app/shared/directives/button.directive';
import { ElementRefMock } from 'src/tests/mocks';

describe('ButtonDirective', () => {
  const elementRefMock = ElementRefMock as ElementRef;
  it('should create an instance', () => {
    const directive = new ButtonDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });

  it('should set the outlined classes when the "variation" attr is "outlined"', () => {
    const directive = new ButtonDirective(elementRefMock);
    directive.variation = 'outlined';

    directive.ngOnChanges();

    expect(elementRefMock.nativeElement.className).toContain(
      directive.outlinedButtonClasses,
    );
  });

  it('should set the filled classes when the "variation" attr is "filled"', () => {
    const directive = new ButtonDirective(elementRefMock);
    directive.variation = 'filled';

    directive.ngOnChanges();

    expect(elementRefMock.nativeElement.className).toContain(
      directive.filledButtonClasses,
    );
  });
});
