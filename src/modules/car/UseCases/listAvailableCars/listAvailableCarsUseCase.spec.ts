import { CarsRepositoryInMemory } from '@modules/car/repositories/InMemory/CarsRepositoryInMemory';

import { ListAvailableCarUseCase } from './listAvailableCarUseCase';

let listAvailableCarUseCase : ListAvailableCarUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe('list Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarUseCase = new ListAvailableCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_Brand',
      category_id: 'category_id',
      daily_rate: 12.00,
      description: 'Car_description',
      fine_amount: 100,
      license_plate: 'Car_license1',
      name: 'Car1',
    });

    const cars = await listAvailableCarUseCase.execute({});
    console.log(cars);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand',
      category_id: 'category_id',
      daily_rate: 12.00,
      description: 'Car_description',
      fine_amount: 100,
      license_plate: 'Car_license2',
      name: 'Car2',
    });

    const cars = await listAvailableCarUseCase.execute({ brand: 'Car_brand' });

    expect(cars).toEqual([car]);
  });
});
