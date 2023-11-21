export interface User {
  uid: string;
  isAdmin: boolean;
  email: string;
  username: string;
}

export interface UserCreateDto extends Omit<User, 'uid' | 'isAdmin'> {}
