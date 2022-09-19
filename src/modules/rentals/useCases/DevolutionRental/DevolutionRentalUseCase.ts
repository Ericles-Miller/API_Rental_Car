import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/Repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id:string,
  user_id: string,
}
@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository : IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository : ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }:IRequest) : Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exists!'); // verifica se existe o aluguel do car
    }

    // verify time of rental
    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays( // chamo a funcao para retornar o numero de dias
      rental.start_date,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) { // verifica se a devolucao do carro foi feita antes ou dentro do prazo
      daily = minimum_daily;
    }
    // chamo a funcao para retornar o numero de horas
    const delay = this.dateProvider.compareInHours(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;
    if (delay > 0) { // calc da multa
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }
    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }
}

export { DevolutionRentalUseCase };
