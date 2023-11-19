import { AuthService } from '@core/services';
import { of } from 'rxjs';

/**
 * AuthService mock meant to be used in Unit Tests, is a partial object of the AuthService class
 */
export const AuthServiceMock: Partial<AuthService> = {
  login: jest.fn().mockResolvedValue(() => {}),
  register: jest.fn().mockResolvedValue(() => {}),
  getAuthState: jest.fn().mockImplementation(() => of(null)),
};
