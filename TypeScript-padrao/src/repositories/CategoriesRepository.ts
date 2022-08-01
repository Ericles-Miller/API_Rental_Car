import { Category } from "../model/category";

//DTO => data transfer object
interface ICreatedCategoryDTO {
    name: string;
    description: string;
}


class CategoriesRepository {
    private categories: Category []; // relaciono a classe category 

    constructor() {
        //metodo this serve para acessar metodos do construct 
        this.categories = []; // inicialmente crio um array vazio
    }

    create({description, name} : ICreatedCategoryDTO) {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at : new Date()
        });
    
        this.categories.push(category);
    }

    list(): Category[] { // parametro que sera retornado 
        return this.categories
    }
}

export { CategoriesRepository };