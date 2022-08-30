import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../errors/AppError";

interface IRequest{
    email   :string;
    password:string;
}

interface IResponse{
    user:{
        name:string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository){}

    async execute({email, password}: IRequest): Promise<IResponse> {
        /**verificacoes
         * if user exists
         * password is corrtect
         * generate token 
         */
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or password incorrect!",401);
        }

        //comparando senhas 
        const passwordMatch = await compare(password,user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!",401)
        }
        // generate token
        const token = sign({}, "8125b713a009a54b465f2f029ea632e2", {
            subject: user.id, // relaciona ao id
            expiresIn:"1d", // tempo para expirar 
        });
        
        const tokenReturn: IResponse = {
            token, 
            user:{
                name:email,
                email:user.email
            }
        };
        
        return tokenReturn

    }
}

export{AuthenticateUserUseCase}