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
const listAvailableCarUseCase_1 = require("./listAvailableCarUseCase");
let listAvailableCarUseCase;
let carsRepositoryInMemory;
describe('list Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listAvailableCarUseCase = new listAvailableCarUseCase_1.ListAvailableCarUseCase(carsRepositoryInMemory);
    });
    it('should be able to list all available cars', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            brand: 'Car_Brand',
            category_id: 'category_id',
            daily_rate: 12.00,
            description: 'Car_description',
            fine_amount: 100,
            license_plate: 'Car_license1',
            name: 'Car1',
        });
        const cars = yield listAvailableCarUseCase.execute({});
        console.log(cars);
        expect(cars).toEqual([car]);
    }));
    it('should be able to list all available cars', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            brand: 'Car_brand',
            category_id: 'category_id',
            daily_rate: 12.00,
            description: 'Car_description',
            fine_amount: 100,
            license_plate: 'Car_license2',
            name: 'Car2',
        });
        const cars = yield listAvailableCarUseCase.execute({ brand: 'Car_brand' });
        expect(cars).toEqual([car]);
    }));
});
