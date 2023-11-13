import { ComponentFixture } from '@angular/core/testing';
import { queryById } from './finders.helper';

/**
 * Simulates a click on an element idenitiied by a testId
 * @param fixture Component fixture of the test suite
 * @param testId testId of the element
 * @param unknown The event object to be passed with the click event (null by default)
 */
function clickEvent<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  event: unknown = null
): void {
  const debugElement = queryById(fixture, testId);

  debugElement.triggerEventHandler('click', event);
}

export { clickEvent };
