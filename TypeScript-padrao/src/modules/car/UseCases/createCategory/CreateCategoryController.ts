import {Request,Response} from 'express'
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {

    async handle(request:Request,response:Response): Promise<Response> {
        const { name, description } = request.body;
        // importo a nossa classe createdCategoryUseCase via injection 
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase); // container.resolve vem do typeorm 
        
        await createCategoryUseCase.execute({name,description}); // class do repositorio declarada acima 
        return response.status(201).send();
    }
}

export { CreateCategoryController};