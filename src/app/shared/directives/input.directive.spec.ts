import { ElementRefMock } from '@testing/mocks';
import { InputDirective } from './input.directive';
import { ElementRef } from '@angular/core';

describe('Input - Directive', () => {
  const elementRefMock: Partial<ElementRef> = ElementRefMock;
  it('should create an instance', () => {
    const directive = new InputDirective(elementRefMock as ElementRef);
    expect(directive).toBeTruthy();
  });
});
