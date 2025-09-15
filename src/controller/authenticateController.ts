import { Request, Response } from "express";
import { PrismaRepository } from "../repositories/prisma-repository";
import { AuthenticateUseCase } from "../services/authenticateService";

export class AuthenticateController {

    static async AuthenticateUser(req: Request, res: Response){

        const prismaRepository = new PrismaRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaRepository)

        const {email, password} = req.body

        const user = authenticateUseCase.execute({email, password})

        res.status(200).send(user)

    }

}