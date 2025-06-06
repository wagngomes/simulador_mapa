import { request } from 'undici';
import { PrismaRepository } from '../repositories/prisma-repository';

export class GetPythonForecasting {
    constructor(private prismaRepository: PrismaRepository) {}

    async execute() {
        const historic = await this.prismaRepository.getHistoricData();

        const formattedData = historic.map((item: any) => ({
            ds: item.data,
            y: Number(item.quantity),
            cd: item.cd,
            codigo_produto: item.product
        }));

        const { body, statusCode } = await request('http://localhost:8000/forecast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: formattedData }),
            headersTimeout: 720*60*1000, 
            bodyTimeout: 720*60*1000     //12 horas <-- tempo total para o corpo da resposta (60 min)
        });

        if (statusCode !== 200) {
            throw new Error(`Erro ao chamar o forecasting: ${statusCode}`);
        }

        const chunks: Buffer[] = [];
        for await (const chunk of body) {
            chunks.push(chunk);
        }
        const responseString = Buffer.concat(chunks).toString('utf8');
        return JSON.parse(responseString);
    }
}