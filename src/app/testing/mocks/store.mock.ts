import { Store } from '@ngrx/store';
import { of } from 'rxjs';

export const StoreMock: Partial<Store> = {
  select: jest.fn().mockImplementation(() => of({})),
  dispatch: jest.fn(),
};
