import client from '../database/client'
import { HistoricSell } from "../utils/historicSellCsvParse"
import { InventoryInterface } from "../utils/inventoryCsvParse"
import { ForecastingDBPersistUseCaseRequest } from '../services/forecastingDbPersistService'
import { response } from 'express';

export class PrismaRepository {

    async createImportInventory(dataArray: InventoryInterface[]){
        await client.inventory.createMany({ data: dataArray });
        return 

    }
    async createImportHistoric(dataArray: HistoricSell[]){
        await client.historic.createMany({data:dataArray})
        return 
    }

    async getHistoricData() {
        const data = await client.historic.findMany()       
        return data
    }
    
    async createForecast(dataArray: ForecastingDBPersistUseCaseRequest[]){

        await client.forecast.createMany({data:dataArray})
        return
     
    }
        
    
}