import { CarsRepository } from '@modules/car/infra/typeorm/repositories/CarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/Repositories/IRentalsRepository';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carRepository: CarsRepository,
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHour = 24;
    const carUnavailable = await this.rentalsRepository.findByCar(car_id);
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable!');
    }
    if (rentalOpenToUser) {
      throw new AppError('there is a rental in progress for user!');
    }
    // validacao aluguel duracao 24 horas
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
