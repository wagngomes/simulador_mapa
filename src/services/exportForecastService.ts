import path from "node:path";
import { PrismaRepository } from "../repositories/prisma-repository";
import * as XLSX from "xlsx";

export class ExportForecastUseCase {
  constructor(private prismaRepository: PrismaRepository) {}

  async execute() {
    
    const exportPath = path.resolve(__dirname, "../lib/uploads/forecast.xlsx");

    const data = await this.prismaRepository.getForecast();

    // Cria uma planilha com os dados
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Forecast");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return buffer;

    console.log("Exportação para Excel concluída com sucesso.");
  }
}
