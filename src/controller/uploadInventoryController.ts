import express, { Request, Response } from "express"
import multer from "multer"
import storage from "../lib/multerConfig"
import { PrismaRepository } from "../repositories/prisma-repository"
import { InventoryUploadUseCase } from "../services/uploadInventoryService"

const upload: multer.Multer = multer({ storage: storage })

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
class SaldosUpLoadController {
  static async uploadInventory(
    req: MulterRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).send("Nenhum arquivo foi enviado.")
        return
      }
      const repository = new PrismaRepository()
      const inventoryUploadUseCase = new InventoryUploadUseCase(repository)

      await inventoryUploadUseCase.execute(req.file.path)
      res.status(200).send("Upload e processamento concluídos com sucesso.")
      return
      
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error)
      res.status(500).send("Erro ao processar o arquivo.")
      return
    }
  }
}
export default SaldosUpLoadController
