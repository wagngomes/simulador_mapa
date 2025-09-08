import client from '../database/client'
import { HistoricSell } from "../utils/historicSellCsvParser"
import { InventoryInterface } from "../utils/inventoryCsvParser"
import { ForecastingDBPersistUseCaseRequest } from '../services/forecastingDbPersistService'
import { StatusProcess } from '@prisma/client';

export class PrismaRepository {

    async createImportInventory(dataArray: InventoryInterface[]){
        await client.inventory.createMany({ data: dataArray });
        return 
    }

    async createImportHistoric(dataArray: HistoricSell[]){
        await client.historic.createMany({data:dataArray})
        return 
    }

    async getHistoricData(id: string) {
        const data = await client.historic.findMany({
            where: {
                import_id: id
            }
        })       
        return data
    }
    
    async createForecast(dataArray: ForecastingDBPersistUseCaseRequest[]){

        await client.forecast.createMany({data:dataArray})
        return    
    }

    async getForecast(){

        const forecast = await client.forecast.findMany()
        return forecast
    }

    async updateSimulationForecastStatus(import_id: string, status: StatusProcess){

        await client.historic.updateMany({
            where: {
                import_id
            },
            data: {
                status: status
            }
            
        })

        return
    }

    async fetchScenarios(){
        const scenarios = await client.historic.findMany({
            select: {
                import_id:true,
                scenario_name: true,
                scenario_tag: true,
                scenario_description: true,
                source_file: true,
                createdAt: true,
                status: true
            },
            distinct: ['import_id']
        })
        return scenarios
    }

    async refreshStatusToQueued(id: string){

        await client.historic.updateMany({
            where:{
                import_id: id
            },
            data: {
                status: 'queued'
            }
        })

    }
        
    
}