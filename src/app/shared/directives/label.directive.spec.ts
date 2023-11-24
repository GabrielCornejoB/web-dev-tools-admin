import { ElementRef } from '@angular/core';
import { ElementRefMock } from '@testing/mocks';
import { LabelDirective } from './label.directive';

describe('LabelDirective', () => {
  const elementRefMock: Partial<ElementRef> = ElementRefMock;

  it('should create an instance', () => {
    const directive = new LabelDirective(elementRefMock as ElementRef);
    expect(directive).toBeTruthy();
  });
});
