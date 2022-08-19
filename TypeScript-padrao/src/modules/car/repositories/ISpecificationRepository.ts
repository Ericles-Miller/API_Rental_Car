import { Specification } from "../entities/specifications";

interface ICreatedSpecificationDTO{
    name:string;
    description:string;
}

interface ISpecificationRepository {

    create({name, description}:ICreatedSpecificationDTO):void;  
    findByName(name: string):Specification; 
}

export { ISpecificationRepository,ICreatedSpecificationDTO };