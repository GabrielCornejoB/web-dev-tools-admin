import { ComponentFixture } from '@angular/core/testing';
import { queryById } from './finders.helper';

function setInputValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string
) {
  const inputDebug = queryById(fixture, testId);
  const input: HTMLInputElement = inputDebug.nativeElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  input.dispatchEvent(new Event('blur'));
}

export { setInputValue };
