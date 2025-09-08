import { PrismaRepository } from '../repositories/prisma-repository';
import { sendHistoricData } from '../broker/messages/published-data';
import { Historic } from '@prisma/client';


export class GetPythonForecasting {
    constructor(private prismaRepository: PrismaRepository) { }

    //Data (formato: YYYY-MM-DD)

    async execute(id: string) {
        const historic = await this.prismaRepository.getHistoricData(id);
        const cenario_id = id

        const formattedData = historic.map((item: Historic) => ({
            ds: item.data,
            y: Number(item.quantity),
            cd: item.cd,
            codigo_produto: item.product
        }))

        sendHistoricData({cenario_id, items: formattedData })

        await this.prismaRepository.refreshStatusToQueued(id)



    }
}