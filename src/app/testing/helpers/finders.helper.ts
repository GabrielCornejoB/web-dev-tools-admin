import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Function to get the debug element from a CSS query.
 * @param fixture Component fixture of the unit test suite
 * @param selector CSS selector to find the element in the template
 * @returns The first debug element that matches the selector
 */
function query<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

/**
 * Function to get the debug element from a specific testId.
 * @param fixture Component fixture of the unit test suite
 * @param testId testId of the element
 * @returns The debug element that matches the testId
 */
function queryById<T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

/**
 * Function to get the text from a specific element.
 * @param fixture Component fixture of the unit test suite
 * @param testId testId of the element
 * @returns The text of the specified element or null
 */
function getText<T>(
  fixture: ComponentFixture<T>,
  testId: string
): string | null {
  const debugElement = queryById(fixture, testId);
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
}

export { query, queryById, getText };
