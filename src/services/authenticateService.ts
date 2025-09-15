import { PrismaRepository } from "../repositories/prisma-repository";
import {compare} from 'bcryptjs'

export interface AuthenticateRequest {
    email: string
    password: string
}

export class AuthenticateUseCase {
    constructor(private prismaRepository: PrismaRepository){}

    async execute({email, password}: AuthenticateRequest){

        const user = await this.prismaRepository.findUserByEmail(email)

        if(!user){
            throw new Error('Credenciais inválidas')
        }

        const doesPasswordIsOK = await compare(password, user?.password )

        if(!doesPasswordIsOK){
            throw new Error('Credenciais inválidas')
        }

        return user


    }
}