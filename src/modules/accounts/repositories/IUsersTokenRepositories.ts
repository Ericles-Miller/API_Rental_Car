import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokenRepository {
    create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO) : Promise<UserTokens>
}

export { IUsersTokenRepository };
