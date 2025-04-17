import { PrismaRepository } from "../repositories/prisma-repository";
import { GetPythonForecasting } from "../services/getPythonForecasting";
import { Request, Response } from "express";

export class GetForecastApi{

    static async getForecasting(req: Request, res: Response){

        const dataRepository = new PrismaRepository()
        const sut = new GetPythonForecasting(dataRepository)

        const data = await sut.execute()

        res.status(200).send(data)
        
    }
}