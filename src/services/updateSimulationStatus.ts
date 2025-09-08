import { StatusProcess } from "@prisma/client";
import { PrismaRepository } from "../repositories/prisma-repository";

export interface UpdateStatusRequestUseCase{
    import_Id: string,
    status: StatusProcess

}


export class UpdateSimulationStatusUseCase {

    constructor(private prismaRepository: PrismaRepository){}

    async execute ({import_Id, status}: UpdateStatusRequestUseCase) {

        await this.prismaRepository.updateSimulationForecastStatus(import_Id,status)

    }

}