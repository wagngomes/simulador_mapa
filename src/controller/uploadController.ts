import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import { parse } from "fast-csv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const importCSV = async (req: FastifyRequest, reply: FastifyReply) => {
  const file = (req as any).file;

  if (!file) {
    return reply.status(400).send({ message: "Nenhum arquivo enviado" });
  }

  const filePath = file.path;
  const records: any[] = [];

  fs.createReadStream(filePath)
    .pipe(parse({ headers: true }))
    .on("data", (row) => {
      records.push({
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
        dia_sugerido_pedido: new Date(row.dia_sugerido_pedido),
        qtd_comprada: parseInt(row.qtd_comprada),
        preco_total: parseFloat(row.preco_total),
        status: row.status,
      });
    })
    .on("end", async () => {
      try {
        await prisma.map.createMany({
          data: records,
          //skipDuplicates: true, // Evita inserir registros duplicados
        });

        fs.unlinkSync(filePath); // Remove o arquivo após a importação
        reply.send({
          message: "Importação concluída com sucesso!",
          total: records.length,
        });
      } catch (error) {
        console.error("Erro ao salvar no banco:", error);
        reply.status(500).send({ message: "Erro ao salvar os dados" });
      }
    })
    .on("error", (err) => {
      console.error("Erro ao processar CSV:", err);
      reply.status(500).send({ message: "Erro ao processar CSV" });
    });
};
