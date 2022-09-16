import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
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
    console.log(token);
    const { sub: user_id } = verify(token, '8125b713a009a54b465f2f029ea632e2') as IPayload; // retorna um Ipayload
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does exists!', 401);
    }
    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    console.log(error);
    throw new AppError('Invalid token!', 401);
  }
}
