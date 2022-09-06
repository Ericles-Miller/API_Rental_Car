import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserdto';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryinMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUserCase';

let authenticateUserUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUserCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000234',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUserCase.execute({
      email: user.email,
      password: user.password,
    });
  });
  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '9999',
        email: 'user@user.com',
        password: '1234',
        name: 'User Test Error',
      };
      await createUserUseCase.execute(user);
      await authenticateUserUserCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
