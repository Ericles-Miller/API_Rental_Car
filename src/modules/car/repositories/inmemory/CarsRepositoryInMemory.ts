import { ICreatetCarDTO } from '@modules/car/dtos/ICreateCarDTO';
import { Car } from '@modules/car/infra/typeorm/entities/car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars:Car[] = [];

  async create({
    name, description, daily_rate, license_plate, fine_amount, brand, category_id,
  }: ICreatetCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      name,
      license_plate,
      fine_amount,
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if (
        car.available === true || ((brand && car.brand === brand) || (
          category_id && car.category_id === category_id) || (
          name && car.name === name))
      ) {
        return car; // declarada com base na class
      }
      return null;
    });
    return all;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
