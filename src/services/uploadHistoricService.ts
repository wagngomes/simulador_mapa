import fs from 'node:fs'
import {parse} from 'csv'
import { historicSellParse } from '../utils/historicSellCsvParser'
import { HistoricSell } from '../utils/historicSellCsvParser';
import { PrismaRepository } from '../repositories/prisma-repository';

export class HistoricUploadUseCase {

    constructor(private prismaRepository: PrismaRepository) { }

    async execute(
        path: string,
        import_id: string,
        scenario_name: string,
        scenario_tag: string,
        scenario_description: string,
        source_file: string) {

        const arquivoImportado = path;
        const parser = fs
            .createReadStream(arquivoImportado)
            .pipe(parse({ columns: true, delimiter: ";" }))
        const dadosArray: HistoricSell[] = []

        for await (const row of parser) {

            const linhaDeSaldo = historicSellParse(row, import_id, scenario_name, scenario_tag, scenario_description, source_file)
            dadosArray.push(linhaDeSaldo);
        }
        await this.prismaRepository.createImportHistoric(dadosArray)
        fs.unlinkSync(arquivoImportado);
        return
    }
}