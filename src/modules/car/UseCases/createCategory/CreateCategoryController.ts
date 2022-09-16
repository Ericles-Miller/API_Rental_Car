import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request:Request, response:Response): Promise<Response> {
    const { name, description } = request.body;
    // importo a nossa classe createdCategoryUseCase via injection
    // container.resolve vem do typeorm
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    // class do repositorio declarada acima
    await createCategoryUseCase.execute({ name, description });
    return response.status(201).send();
  }
}

export { CreateCategoryController };
