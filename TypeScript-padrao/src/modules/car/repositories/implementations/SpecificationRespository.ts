import { Specification } from "../../entities/specifications";
import { ICreatedSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";



class SpecificationsRepository implements ISpecificationRepository {
    private specifications : Specification[];

    constructor(){
        this.specifications = [];
    }
    
    create({ name, description }: ICreatedSpecificationDTO): void {
        // cria um id na linha debaixo por causa do constructor
        const specification = new Specification(); //vindo da class Specification arquivo specification.ts

        Object.assign(specification,{
            name, 
            description,
            created_at : new Date(),
        });

        this.specifications.push(specification);
    }
    findByName(name: string):Specification{
        const specifications = this.specifications.find(
            (specification) => specification.name == name
        );
        return specifications
    }

}

export{SpecificationsRepository};