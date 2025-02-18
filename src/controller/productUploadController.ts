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

class productUpLoadController {
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
          descricao: row.descricao,
          grp_Marca: row.grp_Marca,
          d_Grp_Marca: row.d_Grp_Marca,
          refrig: row.refrig,
        };

        dadosArray.push(dadosTratados);
      }

      if (dadosArray.length > 0) {
        await client.product.createMany({ data: dadosArray });
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

export default productUpLoadController;
