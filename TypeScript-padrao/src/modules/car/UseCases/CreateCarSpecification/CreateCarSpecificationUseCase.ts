import { Car } from '@modules/car/infra/typeorm/entities/car';
import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/car/repositories/ISpecificationRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    specifications_id: string [];
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRespository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRespository.findById(car_id);
    if (!carExists) {
      throw new AppError('Car does not exists');
    }
    const specificarion = await this.specificationsRepository.findByIds(specifications_id);

    carExists.specifications = specificarion;

    await this.carsRespository.create(carExists);
    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
