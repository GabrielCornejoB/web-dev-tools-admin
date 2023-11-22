import { UsersService } from '@core/services/users.service';
import { of } from 'rxjs';

export const UsersServiceMock: Partial<UsersService> = {
  addUserToFirestore: jest.fn().mockResolvedValue(() => {}),
  getUserById: jest.fn().mockImplementation(() => of({} as any)),
};
