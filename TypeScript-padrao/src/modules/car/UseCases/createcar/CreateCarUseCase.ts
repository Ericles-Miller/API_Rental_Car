import { ICarsRepository } from "@modules/accounts/repositories/ICarsRepository";
import { Car } from "@modules/car/infra/typeorm/entities/car";
import { inject, injectable } from "tsyringe";

interface IRequest{
    name:string;
    description:string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id:string;
}

//@injectable()
class CreateCarUseCase {
    constructor (
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}                        
    async execute({
        name,description,daily_rate,license_plate,fine_amount,brand,category_id
    }:IRequest): Promise<Car> {

        const carAlreadyExists = this.carsRepository.findByLicensePlate(license_plate);
        if(carAlreadyExists){
            throw new Error("License plate car alread exits!");
        }
        const car = await this.carsRepository.create({
            name,
            description
            ,daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });
        return car;
    }
}
export { CreateCarUseCase };