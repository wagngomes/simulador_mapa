import express, { Request, Response } from "express";
import fs from "node:fs";
import multer from "multer";
import storage from "../lib/multerConfig";
//import csv from "csv";
import  client  from "../database/client";

const upload: multer.Multer = multer({ storage: storage });

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

class MapUpLoadController {
  /*static async uploadMap(req: MulterRequest, res: Response): Promise<void> {
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
          produto: row.produto,
          descricao: row.descricao,
          b_o: row.b_o,
          mat_med: row.mat_med,
          fornecedor: row.fornecedor,
          comprador: row.comprador,
          primeira_filial_rota: row.primeira_filial_rota,
          filial_dest: row.filial_dest,
          sigla_dest: row.sigla_dest,
          empresa_dest: row.empresa_dest,
          grupo_tributacao: row.grupo_tributacao,
          flag_tributacao: row.flag_tributacao,
          rota: row.rota,
          codigo: row.codigo,
          gui_semana_saida: row.gui_semana_saida,
          gui_semana_chegada: row.gui_semana_chegada,
          modo_compra: row.modo_compra,
          dia_sugerido_pedido: row.dia_sugerido_pedido,
          qtd_comprada: Number(row.qtd_comprada) || 0,
          preco_total: parseFloat(row.preco_total) || 0.0,
          status: row.status,
        };

        dadosArray.push(dadosTratados);
      }

      if (dadosArray.length > 0) {
        await client.map.createMany({ data: dadosArray });
      }

      res.status(200).send("Upload e processamento concluídos com sucesso.");
      fs.unlinkSync(arquivoImportado);
      return;
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
      res.status(500).send("Erro ao processar o arquivo.");
      return;
    }
  }*/
}

export default MapUpLoadController;
