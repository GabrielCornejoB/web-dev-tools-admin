import { Store } from '@ngrx/store';
import { of } from 'rxjs';

/** Ngrx store mock, meant to be used for unit tests, is a partial object of the Store class */
export const StoreMock: Partial<Store> = {
  select: jest.fn().mockImplementation(() => of({})),
  dispatch: jest.fn(),
};
