import express, { Request, Response } from "express"
import multer from "multer"
import storage from "../lib/multerConfig"
import { PrismaRepository } from "../repositories/prisma-repository"
import { HistoricUploadUseCase } from "../services/uploadHistoricService"
import { randomUUID } from "node:crypto"

const upload: multer.Multer = multer({ storage: storage })

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
class HistoricUpLoadController {
  static async uploadHistoric(
    req: MulterRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).send("Nenhum arquivo foi enviado.")
        return
      }
      const repository = new PrismaRepository()
      const historicUploadUseCase = new HistoricUploadUseCase(repository)

      const { scenario_name, scenario_tag, scenario_description, source_file} = req.body

      const import_id = randomUUID()

      const status = 'imported'

      await historicUploadUseCase.execute(req.file.path, import_id , scenario_name, scenario_tag, scenario_description, source_file, status )
      res.status(200).send("Upload e processamento concluídos com sucesso.")
      return
      
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error)
      res.status(500).send("Erro ao processar o arquivo.")
      return
    }
  }
}
export default HistoricUpLoadController