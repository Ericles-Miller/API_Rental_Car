import { Category } from '@modules/car/infra/typeorm/entities/category';

import { ICategoriesRepository, ICreatedCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  public categories:Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async create({ name, description }: ICreatedCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);
  }
}
export { CategoriesRepositoryInMemory };
