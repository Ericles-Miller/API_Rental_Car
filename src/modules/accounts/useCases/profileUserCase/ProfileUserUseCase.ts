import { User } from '@modules/accounts/infra/typeorm/entities/user';
import { IUsersRepository } from '@modules/accounts/Repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}

export { ProfileUserUseCase };
