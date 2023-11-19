import { AuthService } from '@core/services';
import { of } from 'rxjs';

export const AuthServiceMock: Partial<AuthService> = {
  login: jest.fn().mockResolvedValue(() => {}),
  register: jest.fn().mockResolvedValue(() => {}),
  getAuthState: jest.fn().mockImplementation(() => of(null)),
};
