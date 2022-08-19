import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default(): CreateCategoryController => {
const categoryRepository = new CategoriesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

const createCategorycontroller = new CreateCategoryController(createCategoryUseCase);

return createCategorycontroller;
};

