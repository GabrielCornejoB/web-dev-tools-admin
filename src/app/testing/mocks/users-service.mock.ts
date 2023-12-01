import { of } from 'rxjs';

import { UsersService } from '@core/services';

/** Users Service mock meant to be used in Unit Tests, is a partial object of the AuthService class */
export const UsersServiceMock: Partial<UsersService> = {
  addUserToFirestore: jest.fn().mockImplementation(() => of({} as any)),
  getUserById: jest.fn().mockImplementation(() => of({} as any)),
};
