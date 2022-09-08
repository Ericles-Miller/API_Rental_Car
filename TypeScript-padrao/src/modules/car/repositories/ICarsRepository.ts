import { ICreatetCarDTO } from '@modules/car/dtos/ICreateCarDTO';
import { Car } from '@modules/car/infra/typeorm/entities/car';

interface ICarsRepository {
    create(data:ICreatetCarDTO): Promise<Car>;
    findByLicensePlate(license_plate:string): Promise<Car>;
    findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findById(cars_id:string): Promise<Car>;
}

export { ICarsRepository };
