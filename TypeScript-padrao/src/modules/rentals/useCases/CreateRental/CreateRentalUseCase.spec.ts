import { RentalsRepositoryInMemory } from '@modules/rentals/Repositories/in-memory/RentalsRepositoryInMemory';
import dayjs from 'dayjs';

import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase : CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
describe('Create Rental', () => {
  const dayAdd24hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expect_return_date: dayAdd24hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rentali if there is another ot the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '54321',
        expect_return_date: dayAdd24hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '54321',
        expect_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rentali if there is another ot the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expect_return_date: dayAdd24hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: '321',
        car_id: 'test',
        expect_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expect_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});