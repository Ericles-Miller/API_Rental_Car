import { Specification } from '../infra/typeorm/entities/specifications';

interface ICreatedSpecificationDTO{
    name:string;
    description:string;
}

interface ISpecificationRepository {

    create({ name, description }:ICreatedSpecificationDTO):Promise <Specification>;
    findByName(name: string):Promise <Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreatedSpecificationDTO };
