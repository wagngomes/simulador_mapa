import fs from 'node:fs'
import {parse} from 'csv'
import { historicSellParse } from '../utils/historicSellCsvParser'
import { HistoricSell } from '../utils/historicSellCsvParser';
import { PrismaRepository } from '../repositories/prisma-repository';

export class HistoricUploadUseCase {

    constructor(private prismaRepository: PrismaRepository) { }

    async execute(path: string) {

        const arquivoImportado = path;
        const parser = fs
            .createReadStream(arquivoImportado)
            .pipe(parse({ columns: true, delimiter: ";" }))
        const dadosArray: HistoricSell[] = []

        for await (const row of parser) {

            const linhaDeSaldo = historicSellParse(row)
            dadosArray.push(linhaDeSaldo);
        }
        await this.prismaRepository.createImportHistoric(dadosArray)
        fs.unlinkSync(arquivoImportado);
        return
    }
}