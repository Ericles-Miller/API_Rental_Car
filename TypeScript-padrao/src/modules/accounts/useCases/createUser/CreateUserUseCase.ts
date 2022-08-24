import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserdto";
import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject(UsersRepository) 
        private userRepository: IUsersRepository){}

    async execute({name,email,password,driver_license}:ICreateUserDTO):Promise<void>{
        
        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if(userAlreadyExists){
            throw new Error("User already Exists");  
         }

        //criptografia senhas 
        const passwordHash = await hash(password,8);

        await this.userRepository.create({
            name,
            email,
            password:passwordHash,
            driver_license,
        });
    }
}

export {CreateUserUseCase};