import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";



interface IRequest {
    name: string;
    description: string;
};

/**
 * precisamos definir como fucionara a pratica DIP(dependency inverson principle)
 * vamos inverver os papeis, iremos chamar dentro da classe abaixo a classe definida no nosso
 * arquivo de repositorio.
 */
class CreateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

    execute({name, description}: IRequest): void { // no momento nao iremos retornar nada 
        //findByName [e o nome da funcao, nao confunda como o metodo de find()
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if(categoryAlreadyExists) {
        throw new Error("Category already exists!");
    }
    
    this.categoriesRepository.create({name, description});
    }
}


export {CreateCategoryUseCase};