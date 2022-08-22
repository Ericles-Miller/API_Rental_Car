import { ICreateUserDTO } from "../dtos/ICreateUserdto";

interface IUsersRepository{
    create(data:ICreateUserDTO): Promise<void>;
}

export { IUsersRepository}