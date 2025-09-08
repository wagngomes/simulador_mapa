import { Request, Response } from "express";
import { PrismaRepository } from "../repositories/prisma-repository";
import { FetchScenariosUseCase } from "../services/fetchScenariosService";

export class fecthScenariosController{

    static async fetchScenarios(req: Request, res: Response){

        const dataRepository = new PrismaRepository()
        const sut = new FetchScenariosUseCase(dataRepository)

        const scenarios = await sut.execute()

        res.status(200).send(scenarios)

    }


}