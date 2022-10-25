import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/accounts/Repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject(UsersRepository)
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    name, email, password, driver_license,
  }:ICreateUserDTO):Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already Exists', 401);
    }
    // criptografia senhas
    const passwordHash = await hash(password, 8);
    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
