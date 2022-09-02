import { ICreatetCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { Car } from "@modules/car/infra/typeorm/entities/car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{

    cars:Car[] = []; 

    async create({name,description,daily_rate,license_plate,fine_amount,brand,category_id}: ICreatetCarDTO): Promise<void> {
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

    }

}

export {CarsRepositoryInMemory};