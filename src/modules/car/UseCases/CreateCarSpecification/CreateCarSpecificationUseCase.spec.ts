import { CarsRepositoryInMemory } from '@modules/car/repositories/InMemory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/car/repositories/InMemory/SpecificationReposioryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificarionRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificarionRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificarionRepositoryInMemory,
    );
  });

  it('should not be able to add a new specifications to a new-existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['54321'];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specifications to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificarionRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const specifications_id = [specification.id];

    const SpecificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(SpecificationsCars).toHaveProperty('specifications');
    expect(SpecificationsCars.specifications.length).toBe(1); // tamanhi ser igual a 1
  });
});
