import { UsersService } from '@core/services/users.service';
import { of } from 'rxjs';

export const UsersServiceMock: Partial<UsersService> = {
  addUserToFirestore: jest.fn().mockImplementation(() => of({} as any)),
  getUserById: jest.fn().mockImplementation(() => of({} as any)),
};
