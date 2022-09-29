import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface IPayload {
    sub:string;
}

/* a funcao nextFunction aceita a proxima rota que recebera a rota */
export async function ensureAuthenticated(request:Request, response:Response, next:NextFunction) {
  // bearer fsdjljtwre5435nlk23sfsd
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }
  // a virgula ignora
  const [, token] = authHeader.split(' '); // divide a string pelo space -- nao retirar o space

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_token,
    ) as IPayload; // retorna um Ipayload

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    console.log(error);
    throw new AppError('Invalid token!', 401);
  }
}
