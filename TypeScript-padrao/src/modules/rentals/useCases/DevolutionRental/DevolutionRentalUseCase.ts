import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/Repositories/IRentalsRepository';
import { inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id:string,
  user_id: string,
}

class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository : IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository : ICarsRepository,
  ) {}

  async execute({ id, user_id }:IRequest):Promise<void> {
    const rental = await this.rentalRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }
  }
}

export { DevolutionRentalUseCase };
