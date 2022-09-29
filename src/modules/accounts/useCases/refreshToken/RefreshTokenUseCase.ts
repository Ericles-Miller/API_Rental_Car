import auth from '@config/auth';
import { IUsersTokenRepository } from '@modules/accounts/Repositories/IUsersTokenRepositories';
import { verify, sign } from 'jsonwebtoken';
import { inject } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayLoad {
  sub: string;
  email: string;
}

interface ITokenResponse{
    token: string;
    refresh_token: string;
}

class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private usersTokensRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private datejsProvider: IDateProvider,
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayLoad;
    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndToken(user_id, token);

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_date = this.datejsProvider.addDays(auth.expires_refresh_token_days);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({ expires_date, refresh_token, user_id });

    // generate token
    const newToken = sign({}, auth.secret_token, {
      subject: user_id, // relaciona ao id
      expiresIn: auth.expires_in_token, // tempo para expirar relacionado ao export auth
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
