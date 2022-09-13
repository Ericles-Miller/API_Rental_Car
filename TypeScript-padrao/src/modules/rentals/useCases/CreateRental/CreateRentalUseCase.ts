import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/Repositories/IRentalsRepository';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
  ) {}
  async execute({ user_id, car_id, expect_return_date }: IRequest): Promise<Rental> {
    const minimumHour = 24;
    const carUnavailable = await this.rentalsRepository.findByCar(car_id);
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (carUnavailable) {
      throw new AppError('Car is unavailable!');
    }
    if (rentalOpenToUser) {
      throw new AppError('there is a rental in progress for user!');
    }
    // validacao aluguel dura;'ao 24 horas
    const expectedReturnDateFormat = dayjs(expect_return_date).utc().local().format();
    const dateNow = dayjs().utc().local().format();
    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hour');

    if (compare < minimumHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expect_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
