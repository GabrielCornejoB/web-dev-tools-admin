import { of } from 'rxjs';

import { AuthService } from '@core/services';

/**
 * AuthService mock meant to be used in Unit Tests, is a partial object of the AuthService class
 */
export const AuthServiceMock: Partial<AuthService> = {
  login: jest.fn().mockImplementation(() => of({})),
  register: jest.fn().mockImplementation(() => of({})),
  logout: jest.fn().mockImplementation(() => of()),
  getAuthState: jest.fn().mockImplementation(() => of(null)),
};
