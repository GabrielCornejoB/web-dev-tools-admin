import { Store } from '@ngrx/store';

/** Ngrx store mock, meant to be used for unit tests*/
export const StoreMock: Store = {
  select: jest.fn(),
  dispatch: jest.fn(),
} as any as Store;
