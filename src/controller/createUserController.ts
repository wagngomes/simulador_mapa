import { PrismaRepository } from "../repositories/prisma-repository"
import { CreateUserUseCase } from "../services/createUserService"
import { Request, Response } from "express";
import {hash} from 'bcryptjs'


export class CreateUserController{

    static async createUser(req: Request, res: Response){

        const prismaRepository = new PrismaRepository()
        const createUserUseCase = new CreateUserUseCase(prismaRepository)

        const {name, email, password, role} = req.body
        const password_hashed = await hash(password, 6)

        const user = await createUserUseCase.execute(
            name,
            email,
            password_hashed,
            role
        )

        res.status(201).send(user)

    }

}