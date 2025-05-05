import { PrismaRepository } from "../repositories/prisma-repository"
import { forecastingDbPersistUseCase } from "../services/forecastingDbPersistService"
import { Request, Response } from "express"

export class ForecastingDbPersistController {

    static async ForecastingDbPersist(req: Request, res: Response){
    
        const dataRepository = new PrismaRepository()
        const sut = new forecastingDbPersistUseCase(dataRepository)
    
        try{
            await sut.execute()
            res.status(201).send("Dados salvos no banco")
        }catch(error){
            console.error("Erro ao processar o arquivo:", error)
            res.status(500).send("Erro ao processar o arquivo.")
            return
            
        }   
            
    }

}