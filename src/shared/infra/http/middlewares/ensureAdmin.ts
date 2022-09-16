import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';

export async function ensureAdmin(request:Request, response:Response, next: NextFunction) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new Error("User isno't admin");
  }
  return next();
}
