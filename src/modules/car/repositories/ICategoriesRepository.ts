import { Category } from '../infra/typeorm/entities/category';

// DTO => data transfer object
interface ICreatedCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name:string):Promise<Category>;
    list():Promise <Category[]>;
    create({ name, description }:ICreatedCategoryDTO):Promise<void>;
}

export { ICategoriesRepository, ICreatedCategoryDTO };
