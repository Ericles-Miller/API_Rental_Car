import { ICreateRentalDTO } from '../dtos/ICreatedRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
    findByCar(car_id:string):Promise<Rental>;
    findOpenRentalByUser(user_id:string):Promise<Rental>;
    create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
