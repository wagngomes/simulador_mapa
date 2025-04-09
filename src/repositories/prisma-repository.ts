import client from '../database/client'
import { HistoricSell } from "../utils/historicSellCsvParse";
import { InventoryInterface } from "../utils/inventoryCsvParse";



export class PrismaRepository {

    async createImportInventory(dataArray: InventoryInterface[]){

        await client.inventory.createMany({ data: dataArray });

        return 

    }
    async createImportHistoric(dataArray: HistoricSell){
        await client.historic.createMany({data:dataArray})
        return 
    }
        
    
}