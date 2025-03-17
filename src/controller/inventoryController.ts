import { client } from "../database/client";
import { Request, Response } from "express";

class InventoryController {
  static async limpaBancoInventory(req: Request, res: Response) {
    await client.inventory.deleteMany();
    res.status(200).json("dados deletados com sucesso");
  }
}

export default InventoryController;
