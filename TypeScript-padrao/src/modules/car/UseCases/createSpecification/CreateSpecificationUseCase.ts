import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";


interface IRequest {
    name: string;
    description: string
}

class CreateSpecificationUseCase {

    constructor (private specificationsRespository: ISpecificationRepository){
    }

    execute({description, name}:IRequest):void {
        // estou chamando uma funcao abaixo chamada find da class specificationRespository
        const specificationAlreadyExists = this.specificationsRespository.findByName(name);
        if(specificationAlreadyExists){
            throw new Error("Specificarion already exists!");
        }

        this.specificationsRespository.create({
            name, 
            description
        });
    }

}

export {CreateSpecificationUseCase};