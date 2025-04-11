import { Request, Response } from "express";
import  client  from "../database/client";

class MapController {
  static async retornaMapaCompleto(req: Request, res: Response) {
    const mapa = await client.map.findMany();

    res.status(200).json(mapa);
  }

  static async limpaBanco(req: Request, res: Response) {
    await client.map.deleteMany();
    res.status(200).json("dados deletados com sucesso");
  }

  static async mapaSumarizado(req: Request, res: Response) {
    try {
      // Consulta 1: Agrupar 'Map' por 'produto' e somar 'qtd_comprada'
      const mapaSumarizado = await client.map.groupBy({
        by: ["produto"],
        _sum: {
          qtd_comprada: true,
        },
      });

      // Criar um novo array com os dados complementares de Inventory
      const resultadoFinal = await Promise.all(
        mapaSumarizado.map(async (item) => {
          // Consulta 2: Somar 'forecast' e 'estoque_in' na tabela 'Inventory'
          const inventoryData = await client.inventory.aggregate({
            _sum: {
              forecast: true,
              estoque_in: true,
            },
            where: {
              codigo: item.produto, // Relacionamento entre Map.produto e Inventory.codigo
            },
          });

          return {
            produto: item.produto,
            qtd_comprada: item._sum.qtd_comprada ?? 0,
            forecastSum: inventoryData._sum.forecast ?? 0,
            estoqueInSum: inventoryData._sum.estoque_in ?? 0,
          };
        })
      );

      res.json(resultadoFinal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar o mapa sumarizado." });
    }
  }
}

export default MapController;
