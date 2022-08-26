import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/category";
import { ICategoriesRepository,ICreatedCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository{
    private repository: Repository<Category>; //repository -- pertence a biblioteca typeorm

    constructor() {
        this.repository = getRepository(Category); // getRepository pertence ao typeorm --inicialmente crio um array vazio
    }

    async create({description, name} : ICreatedCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description,
            created_at: new Date(),
        });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> { // parametro que sera retornado 
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name:string): Promise<Category> {
        // func abaixo faz o mesmo processo que o find()
        const category = await this.repository.findOne({name});// check if exists 
        return category;
    }
}

export { CategoriesRepository };