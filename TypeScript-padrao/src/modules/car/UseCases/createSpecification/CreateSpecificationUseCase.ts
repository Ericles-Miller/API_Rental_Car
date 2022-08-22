import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";


interface IRequest {
    name: string;
    description: string
}


@injectable()
class CreateSpecificationUseCase {
    constructor (
        @inject("SpecificationRepository")
        private specificationsRespository: ISpecificationRepository){}

    async execute({description, name}:IRequest):Promise<void> {
        // estou chamando uma funcao abaixo chamada find da class specificationRespository
        const specificationAlreadyExists = await  this.specificationsRespository.findByName(name);
        if(specificationAlreadyExists){
            throw new Error("Specificarion already exists!");
        }

        await this.specificationsRespository.create({
            name, 
            description
        });
    }

}

export {CreateSpecificationUseCase};