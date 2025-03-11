import express, { Request, Response } from "express";
import fs from "node:fs";
import multer from "multer";
import storage from "../lib/multerConfig";
import csv from "csv";
import { client } from "../database/client";
import { max, mean, min, sum } from "mathjs";

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
      //console.log("Arquivo recebido:", arquivoImportado)

      const parser = fs
        .createReadStream(arquivoImportado)
        .pipe(csv.parse({ columns: true, delimiter: ";" }));

      const dadosArray = [];

      for await (const row of parser) {
        const dadosTratados = {
          codigo: row.codigo,
          filial: row.filial,
          id: row.codigo + row.filial,
          rota: row.rota,
          m4: Number(row.m4 !== undefined ? row.m4 : 0),
          m3: Number(row.m3 !== undefined ? row.m3 : 0),
          m2: Number(row.m2 !== undefined ? row.m2 : 0),
          m1: Number(row.m1 !== undefined ? row.m1 : 0),
          forecast: Number(row.forecast !== undefined ? row.forecast : 0),
          estoque_in: Number(row.estoque_in !== undefined ? row.estoque_in : 0),
          estoque_livre: Number(
            row.estoque_livre !== undefined ? row.estoque_livre : 0
          ),
          compras: Number(row.compras !== undefined ? row.compras : 0),
          transferencias: Number(
            row.transferencias !== undefined ? row.transferencias : 0
          ),
          estoque_total: Number(
            row.estoque_total !== undefined ? row.estoque_total : 0
          ),
          cmv: Number(row.cmv !== undefined ? row.cmv : 0),
          mediaSimples: Number((row.m1 + row.m2 + row.m3) / 3),
          ultimoMes: Number(row.m1),
          novaMedia: Number((row.forecast + row.m1 + row.m2) / 3),
          menorVenda: Number(min([row.m1, row.m2, row.m3, row.m4])),
          maiorVenda: Number(max([row.m1, row.m2, row.m3, row.m4])),
          mediaPonderada: Number(
            row.m1 * 0.4 + row.m2 * 0.3 + row.m3 * 0.2 + row.m4 * 0.1
          ),
        };

        dadosArray.push(dadosTratados);
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
