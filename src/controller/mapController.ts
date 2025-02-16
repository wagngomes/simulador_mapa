import { Request, Response } from "express";
import { client } from "../database/client";

class MapController{

    static async retornaMapaCompleto(req: Request, res: Response){

            const mapa = await client.map.findMany()

            res.status(200).json(mapa)
    }

    static async limpaBanco(req: Request, res: Response){

        await client.map.deleteMany()
        res.status(200).json('dados deletados com sucesso')
    }



}

export default MapController