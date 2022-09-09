import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/car/repositories/ISpecificationRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    specifications_id: string [];
}

class CreateCarSpecificationUseCase {
  constructor(
    // @inject('CarsRepository');
    private carsRespository: ICarsRepository,
    private specificationsRepository: ISpecificationRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRespository.findById(car_id);
    if (!carExists) {
      throw new AppError('Car does not exists');
    }
    const specificarion = await this.specificationsRepository.findByIds(specifications_id);

    carExists.specifications = specificarion;

    await this.carsRespository.create(carExists);
  }
}

export { CreateCarSpecificationUseCase };
