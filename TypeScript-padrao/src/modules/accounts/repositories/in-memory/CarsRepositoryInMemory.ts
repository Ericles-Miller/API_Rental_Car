import { ICreatetCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
    create(data: ICreatetCarDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export {CarsRepositoryInMemory};