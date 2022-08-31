import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/inmemory/CategoriesRepositoyInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("should be able create a new Category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name: "Category Test",
            description: "Category description Test",
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able create a new Category with same name ", async () => {

        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description Test",
            };

            await createCategoryUseCase.execute({
                name: "Category Test",
                description: "Category description Test",
            });
            await createCategoryUseCase.execute({
                name: "Category Test",
                description: "Category description Test",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});