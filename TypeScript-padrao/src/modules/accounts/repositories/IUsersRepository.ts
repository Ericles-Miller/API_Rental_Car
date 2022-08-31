import { ICreateUserDTO } from "../dtos/ICreateUserdto";
import { User } from "../infra/typeorm/entities/user";

interface IUsersRepository{
    create(data:ICreateUserDTO): Promise<void>;
    findByEmail(email:string): Promise<User>;
    findById(id:string):Promise<User>
}

export { IUsersRepository}