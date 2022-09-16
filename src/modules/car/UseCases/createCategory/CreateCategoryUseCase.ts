import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
};
/**
o injectable faz uma verredura e associa a classe do createdCategory
ele e responsavel por liberar a criacao das classes da nossa aplicacao 
 */
@injectable() 
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {}

    async execute({name, description}: IRequest): Promise <void> { 

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        if(categoryAlreadyExists) {
            throw new AppError("Category already exists!",401);
        }
        await this.categoriesRepository.create({name, description});
    }
}

export {CreateCategoryUseCase};