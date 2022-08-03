import { Category } from "../model/category";
import { ICategoriesRepository,ICreatedCategoryDTO } from "./ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository{
    private categories: Category []; // relaciono a classe category 

    //Singleton 
    private static INSTANCE: CategoriesRepository;

    // a partir de agora nosso constructor ele sera privado 
    private constructor() {
        //metodo this serve para acessar metodos do construct 
        this.categories = []; // inicialmente crio um array vazio
    }

    //crio um metodo publico agora 
    // tem como objetivo criar ou repassar uma instancia 
    public static getInstance(): CategoriesRepository {
        /** se o nao existir o CategoriesRepository ele ira criar um new */
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
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

    findByName(name:string):Category {
        //categories -- list of class category -- set up 
        const category = this.categories.find(category => category.name === name);// check if exists 
        return category;
    }
}

export { CategoriesRepository };