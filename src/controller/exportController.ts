import  client from "../database/client";
import { Request, Response } from "express";
import { PrismaRepository } from "../repositories/prisma-repository";
import { ExportForecastUseCase } from "../services/exportForecastService";

class ExportForecastController {

  static async ExportForecast(req: Request, res: Response) {

    const prismaRepository = new PrismaRepository()
    const exportForecastUseCase = new ExportForecastUseCase(prismaRepository)

    const buffer = await exportForecastUseCase.execute()

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="forecast.xlsx"');
    res.send(buffer);

    //res.status(200).json("Arquivo criado para exportação");
  }
}

export default ExportForecastController;