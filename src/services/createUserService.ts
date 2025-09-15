import { UserRole } from "@prisma/client";
import { PrismaRepository } from "../repositories/prisma-repository";

export interface CreateUserRequest {
    name: string
    email: string
    password: string
    role: UserRole
}

export class CreateUserUseCase {

    constructor(private prismaRepository: PrismaRepository){}

    async execute (name: string, email: string, password: string, role: UserRole){

        const user = await this.prismaRepository.findUserByEmail(email)


        console.log(user)

        if(user !== null) {
            throw new Error('Email já cadastrado')
        }

        const newUser = await this.prismaRepository.createUser(
            name,
            email,
            password,
            role
        )

        return newUser

    }
}