import { PrismaRepository } from "../repositories/prisma-repository";
import { GetPythonForecasting } from "./getPythonForecastingService";

export interface ForecastingDBPersistUseCaseRequest{
    cd: string
    codigo_produto: string
    data: string
    previsao: number

}

export class forecastingDbPersistUseCase {
    constructor(private prismaRepository: PrismaRepository){}

    getPythonforecasting = new GetPythonForecasting(this.prismaRepository)


    async execute(){

        const forecastResponse = await this.getPythonforecasting.execute()

        const forecasts = forecastResponse.forecasts

        console.log("Forecasts recebidos:", forecasts.length);
        console.log("Exemplo:", forecasts[0]);
     
        await this.prismaRepository.createForecast(forecasts)

        return

    }
}

