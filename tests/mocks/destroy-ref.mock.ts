import { DestroyRef } from '@angular/core';

/** Destroy ref mock required in Dependency Injection of components with subscriptions */
export const DestroyRefMock: DestroyRef = {
  onDestroy: jest.fn(),
};
