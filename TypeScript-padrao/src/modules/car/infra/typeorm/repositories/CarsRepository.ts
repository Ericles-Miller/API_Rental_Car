import { ICreatetCarDTO } from '@modules/car/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';

import { Car } from '../entities/car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand, category_id, daily_rate, description,
    fine_amount, license_plate, name, specifications, id,
  }: ICreatetCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder('c').where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand }); // query que busca valor pela placa
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name }); // query que busca valor pelo nome
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id }); // query para buscar o veiculo a partir do campo category_id
    }

    const cars = await carsQuery.getMany(); // funcao que rodara o comando do banco de dados
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    // update do carro alugado avaialble = true to false
    await this.repository.createQueryBuilder()
      .update().set({ available }).where('id = :id')
      .setParameters({ id })
      .execute();
  }
}
export { CarsRepository };
