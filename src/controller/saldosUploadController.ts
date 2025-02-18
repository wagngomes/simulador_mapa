import express, { Request, Response } from "express";
import fs from "node:fs";
import multer from "multer";
import storage from "../lib/multerConfig";
import csv from "csv";
import { client } from "../database/client";

const upload: multer.Multer = multer({ storage: storage });

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

class SaldosUpLoadController {
  static async uploadProducts(
    req: MulterRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).send("Nenhum arquivo foi enviado.");
        return;
      }

      const arquivoImportado = req.file.path;
      //console.log("Arquivo recebido:", arquivoImportado)

      const parser = fs
        .createReadStream(arquivoImportado)
        .pipe(csv.parse({ columns: true, delimiter: ";" }));

      const dadosArray = [];

      for await (const row of parser) {
        const dadosTratados = {
          codigo: row.codigo,
          filial: row.filial,
          fornecedor: row.fornecedor,
          tributacao: row.tributacao,
          status: row.status,
          curva: row.curva,
          bo: row.bo,
          comprador: row.comprador,
          rota: row.rota,
          m4: row.m4,
          m3: row.m3,
          m2: row.m2,
          m1: row.m1,
          forecast: row.forecast,
          estoque_in: row.estoque_in,
          estoque_livre: row.estoque_livre,
          compras: row.compras,
          transferencias: row.transferencias,
          estoque_total: row.estoque_total,
          cmv: row.cmv,
        };

        dadosArray.push(dadosTratados);
      }

      if (dadosArray.length > 0) {
        //await client.product.createMany({ data: dadosArray });
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
