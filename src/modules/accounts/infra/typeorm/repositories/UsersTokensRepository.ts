import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokenRepository } from '@modules/accounts/Repositories/IUsersTokenRepositories';
import { getRepository, Repository } from 'typeorm';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({ expires_date, user_id, refresh_token });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({ user_id, refresh_token });
    return usersTokens;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
