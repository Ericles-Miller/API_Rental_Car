import { inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file:string;
}

// adicionar columns in table user
        // refatorar usuario com coluna com o avatar 
        // configurar upload nulter 
        // criar regra de negocio 
        // cirar o controller

class UpdateUserAvatarUseCase {

    constructor (
        @inject("UsersRepository")
        private usersRepository: IUsersRepository){}

    async execute({ user_id, avatar_file }:IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);
        console.log(user);
        user.avatar = avatar_file;
        await this.usersRepository.create(user);


    }
}
export {UpdateUserAvatarUseCase};