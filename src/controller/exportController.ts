import { Request, Response } from "express";
import { PrismaRepository } from "../repositories/prisma-repository";
import { ExportForecastUseCase } from "../services/exportForecastService";

class ExportForecastController {

  static async exportForecast(req: Request, res: Response) {

    const prismaRepository = new PrismaRepository()
    const exportForecastUseCase = new ExportForecastUseCase(prismaRepository)

    const buffer = await exportForecastUseCase.execute()

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="forecast.xlsx"');
    res.send(buffer);
  }
}

export default ExportForecastController;