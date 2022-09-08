import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    specifications_id: string [];
}

class CreateCarSpecificationUseCase {
  constructor(
    // @inject('CarsRepository');
    private carsRespository: ICarsRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRespository.findById(car_id);
    if (!carExists) {
      throw new AppError('Car does not exists');
    }
  }
}

export { CreateCarSpecificationUseCase };
