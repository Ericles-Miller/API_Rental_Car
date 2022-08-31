import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserdto";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UserRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject(UsersRepository) 
        private userRepository: IUsersRepository){}

    async execute({name,email,password,driver_license}:ICreateUserDTO):Promise<void>{
        
        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if(userAlreadyExists){
            throw new AppError("User already Exists",401);  
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