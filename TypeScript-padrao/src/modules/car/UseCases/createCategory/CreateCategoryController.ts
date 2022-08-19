import {Request,Response} from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


class CreateCategoryController {

    constructor(private createdCategoryUseCase: CreateCategoryUseCase) {
    
    }

    async handle(request:Request,response:Response): Promise<Response> {
        const { name, description } = request.body;
        /**
        * essa definicao abaixo foi feita por causa do constructor 
        * nela passamos como parametro a class do repositorio como 
        * private. essa declaracao esta em CreateCategoryService.ts
        */
        await this.createdCategoryUseCase.execute({name,description}); // class do repositorio declarada acima 
        return response.status(201).send();
    }
}

export { CreateCategoryController};