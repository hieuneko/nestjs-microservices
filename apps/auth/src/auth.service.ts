import {
  ConflictException,
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserEntity, UserJwt, UserRepositoryInterface } from '@app/shared';

import { ExistingUserDTO } from './dtos/existing-user.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.findAll();

    users.map((user) => user.toDto());

    return users;
  }

  async getUserById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOneById(id);

    return user.toDto();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });
  }

  async findById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOneById(id);

    return user.toDto();
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(newUser: Readonly<NewUserDTO>): Promise<UserDto> {
    const { name, email, password } = newUser;

    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('An account with that email already exists!');
    }

    const hashedPassword = await this.hashPassword(password);

    const savedUser = await this.usersRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    delete savedUser.password;
    return savedUser.toDto();
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return user;
  }

  async login(existingUser: Readonly<ExistingUserDTO>) {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt, user };
  }

  async verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      return { user, exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserFromHeader(jwt: string): Promise<UserJwt> {
    if (!jwt) return;

    try {
      return this.jwtService.decode(jwt) as UserJwt;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
