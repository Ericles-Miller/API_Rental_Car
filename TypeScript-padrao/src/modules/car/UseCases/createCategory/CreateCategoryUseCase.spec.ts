import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/inmemory/CategoriesRrepositoyInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemeory: CategoriesRepositoryInMemory;

describe("Create Category", () =>{
    beforeEach(() => {
        categoriesRepositoryInMemeory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemeory);
    });
    
    it("should be able create a new Category", async () => {
        const category = {
            name: "Category test",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name:"Category Test",
            description: "Category description Test",
        }); 

        const categoryCreated = await categoriesRepositoryInMemeory.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able create a new Category with same name ", async () => {
        
        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description Test",
            };

            await createCategoryUseCase.execute({
                name:"Category Test",
                description: "Category description Test",
            }); 
            await createCategoryUseCase.execute({
                name:"Category Test",
                description: "Category description Test",
            }); 
        }).rejects.toBeInstanceOf(AppError);
    });
 });