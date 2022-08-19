import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import {inject, injectable} from "tsyringe"

interface IRequest {
    name: string;
    description: string;
};
/**
o injectable faz uma verredura e associa a classe do createdCategory
ele e responsavel por liberar a criacao das classes da nossa aplicacao 

 */
@injectable() // 
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository) {}

    async execute({name, description}: IRequest): Promise <void> { // no momento nao iremos retornar nada 
        //findByName [e o nome da funcao, nao confunda como o metodo de find()
        console.log(this.categoriesRepository);
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        if(categoryAlreadyExists) {
            throw new Error("Category already exists!");
        }
        this.categoriesRepository.create({name, description});
    }
}

export {CreateCategoryUseCase};