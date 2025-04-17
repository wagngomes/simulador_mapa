import  client  from "../database/client";
import { Request, Response } from "express";

class ProductController {
  static async limpaBanco(req: Request, res: Response) {

    await client.product.deleteMany()
    res.status(200).json("dados deletados com sucesso");
  }

  static async limpaBancoHistoric(req: Request, res: Response) {

    await client.historic.deleteMany()
    res.status(200).json("dados deletados com sucesso");
  }
}

export default ProductController;
