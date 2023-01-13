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
const CarsRepositoryInMemory_1 = require("@modules/car/repositories/InMemory/CarsRepositoryInMemory");
const SpecificationReposioryInMemory_1 = require("@modules/car/repositories/InMemory/SpecificationReposioryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificarionRepositoryInMemory;
describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        specificarionRepositoryInMemory = new SpecificationReposioryInMemory_1.SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificarionRepositoryInMemory);
    });
    it('should not be able to add a new specifications to a new-existent car', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const car_id = '1234';
            const specifications_id = ['54321'];
            yield createCarSpecificationUseCase.execute({ car_id, specifications_id });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
    it('should be able to add a new specifications to the car', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });
        const specification = yield specificarionRepositoryInMemory.create({
            description: 'test',
            name: 'test',
        });
        const specifications_id = [specification.id];
        const SpecificationsCars = yield createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
        expect(SpecificationsCars).toHaveProperty('specifications');
        expect(SpecificationsCars.specifications.length).toBe(1); // tamanhi ser igual a 1
    }));
});
