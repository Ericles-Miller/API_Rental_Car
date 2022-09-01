import { ICreatetCarDTO } from "@modules/car/dtos/ICreateCarDTO"


interface ICarsRepository {
    create(data:ICreatetCarDTO): Promise<void>;
}

export { ICarsRepository}