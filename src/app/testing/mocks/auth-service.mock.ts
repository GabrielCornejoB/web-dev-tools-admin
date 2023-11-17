import { AuthService } from '@core/services';

export const AuthServiceMock: Partial<AuthService> = {
  login: jest.fn().mockResolvedValue(() => {}),
};
