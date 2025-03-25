import express, { Request, Response } from "express";
import fs from "node:fs";
import multer from "multer";
import storage from "../lib/multerConfig";
import csv from "csv";
import { client } from "../database/client";
import { SaldoInterface, saldosParse } from "../utils/csvParse";

const upload: multer.Multer = multer({ storage: storage });

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
        res.status(400).send("Nenhum arquivo foi enviado.");
        return;
      }

      const arquivoImportado = req.file.path;

      const parser = fs
        .createReadStream(arquivoImportado)
        .pipe(csv.parse({ columns: true, delimiter: ";" }));

      const dadosArray: SaldoInterface[] = [];

      for await (const row of parser) {

        const linhaDeSaldo = saldosParse(row)

        dadosArray.push(linhaDeSaldo);
      }

      if (dadosArray.length > 0) {
        await client.inventory.createMany({ data: dadosArray });
      }
      res.status(200).send("Upload e processamento concluídos com sucesso.");
      fs.unlinkSync(arquivoImportado);
      return;
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
      res.status(500).send("Erro ao processar o arquivo.");
      return;
    }
  }
}

export default SaldosUpLoadController;
