import { Specification } from "../entities/specifications";

interface ICreatedSpecificationDTO{
    name:string;
    description:string;
}

interface ISpecificationRepository {

    create({name, description}:ICreatedSpecificationDTO):Promise <void>;  
    findByName(name: string):Promise <Specification>; 
}

export { ISpecificationRepository,ICreatedSpecificationDTO };