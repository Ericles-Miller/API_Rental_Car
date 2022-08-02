import { Category } from "../model/category";
import { ICategoriesRepository,ICreatedCategoryDTO } from "./ICategoriesRepository";

// clique ctrl + . para importar os metodos relacionados a interface de forma automatica 
// como abaixo 
class PostgresCategoriesRpository implements ICategoriesRepository {
    findByName(name: string): Category {
        throw new Error("Method not implemented.");
    }
    list(): Category[] {
        throw new Error("Method not implemented.");
    }
    create({name, description }:ICreatedCategoryDTO) {
        throw new Error("Method not implemented.");
    }
    
}

export {PostgresCategoriesRpository};
