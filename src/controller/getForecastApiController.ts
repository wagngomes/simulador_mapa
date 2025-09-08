import { PrismaRepository } from "../repositories/prisma-repository";
import { GetPythonForecasting } from "../services/getPythonForecastingService";
import { Request, Response } from "express";

export class GetForecastApi{

    static async getForecasting(req: Request, res: Response){

        const { id } = req.body

        const dataRepository = new PrismaRepository()
        const sut = new GetPythonForecasting(dataRepository)

        const data = await sut.execute(id)

        res.status(200).send(data)
        
    }
}