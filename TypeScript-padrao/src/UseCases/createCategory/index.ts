import { CategoriesRepository } from "../../modules/car/repositories/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


const categoryRepository = new CategoriesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

const createCategorycontroller = new CreateCategoryController(createCategoryUseCase);

export { createCategorycontroller};