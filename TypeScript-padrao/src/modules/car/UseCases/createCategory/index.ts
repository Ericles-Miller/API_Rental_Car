import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default(): CreateCategoryController => {
const categoryRepository = null

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

const createCategorycontroller = new CreateCategoryController(createCategoryUseCase);

return createCategorycontroller;
};

