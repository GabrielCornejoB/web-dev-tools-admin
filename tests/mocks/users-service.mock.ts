import { of } from 'rxjs';

import { UsersService } from '@core/services';

/** Users Service mock meant to be used in Unit Tests*/
export const UsersServiceMock: UsersService = {
  addUserToFirestore: jest.fn().mockImplementation(() => of({} as any)),
  getUserById: jest.fn().mockImplementation(() => of({} as any)),
} as any as UsersService;
