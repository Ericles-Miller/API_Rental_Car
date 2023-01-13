"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../../../shared/errors/AppError");
const CategoriesRepositoyInMemory_1 = require("../../repositories/InMemory/CategoriesRepositoyInMemory");
const CreateCategoryUseCase_1 = require("./CreateCategoryUseCase");
let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe('Create Category', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoyInMemory_1.CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase_1.CreateCategoryUseCase(categoriesRepositoryInMemory);
    });
    it('should be able create a new Category', () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: 'Category Test',
            description: 'Category description Test',
        };
        yield createCategoryUseCase.execute({
            name: 'Category Test',
            description: 'Category description Test',
        });
        const categoryCreated = yield categoriesRepositoryInMemory.findByName(category.name);
        expect(categoryCreated).toHaveProperty('id');
    }));
    it('should not be able create a new Category with same name ', () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: 'Category test',
            description: 'Category description Test',
        };
        yield createCategoryUseCase.execute({
            name: 'Category Test',
            description: 'Category description Test',
        });
        expect(createCategoryUseCase.execute({
            name: 'Category Test',
            description: 'Category description Test',
        })).rejects.toEqual(new AppError_1.AppError('Category already exists!'));
    }));
});
