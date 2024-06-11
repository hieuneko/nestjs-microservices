import { UserEntity, UserJwt } from '@app/shared';
import { ExistingUserDTO } from '../dtos/existing-user.dto';

import { NewUserDTO } from '../dtos/new-user.dto';
import { UserDto } from '../dtos/user.dto';

export interface AuthServiceInterface {
  getUsers(): Promise<UserDto[]>;
  getUserById(id: number): Promise<UserDto>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: number): Promise<UserDto>;
  hashPassword(password: string): Promise<string>;
  register(newUser: Readonly<NewUserDTO>): Promise<UserDto>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<UserEntity>;
  login(existingUser: Readonly<ExistingUserDTO>): Promise<{
    token: string;
    user: UserDto;
  }>;
  verifyJwt(jwt: string): Promise<{ user: UserDto; exp: number }>;
  getUserFromHeader(jwt: string): Promise<UserJwt>;
}
