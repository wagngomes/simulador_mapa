import { client } from "../database/client";
import { InventoryInterface } from "../utils/inventoryCsvParse";



export class PrismaRepository {

    async createImportInventory(dataArray: InventoryInterface[]){

        await client.inventory.createMany({ data: dataArray });

        return

    }
}