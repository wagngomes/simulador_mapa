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


    async execute(id: string){

        const forecastResponse: any = await this.getPythonforecasting.execute(id)

        const forecasts = forecastResponse.forecasts

        await this.prismaRepository.createForecast(forecasts)

        return

    }
}

