import { PrismaRepository } from '../repositories/prisma-repository';
import { sendHistoricData } from '../broker/messages/published-data';
import { Historic } from '@prisma/client';


export class GetPythonForecasting {
    constructor(private prismaRepository: PrismaRepository) { }

    async execute() {
        const historic = await this.prismaRepository.getHistoricData();

        const formattedData = historic.map((item: Historic) => ({
            ds: item.data,
            y: Number(item.quantity),
            cd: item.cd,
            codigo_produto: item.product
        }))

        sendHistoricData({ items: formattedData })

    }
}