import { RentalsRepositoryInMemory } from '@modules/rentals/Repositories/in-memory/RentalsRepositoryInMemory';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase : CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expect_return_date: new Date(),
    });
  });
});
