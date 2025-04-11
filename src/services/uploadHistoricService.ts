import fs from 'node:fs'
import csv from 'csv'
import { historicSellParse } from '../utils/historicSellCsvParse'
import { HistoricSell } from '../utils/historicSellCsvParse';

export class HistoricUploadUseCase {

    constructor(private upLoadRepository: any) { }

    async execute(path: string) {

        const arquivoImportado = path;
        const parser = fs
            .createReadStream(arquivoImportado)
            .pipe(csv.parse({ columns: true, delimiter: ";" }))
        const dadosArray: HistoricSell[] = []

        for await (const row of parser) {

            const linhaDeSaldo = historicSellParse(row)
            dadosArray.push(linhaDeSaldo);
        }
        await this.upLoadRepository.createImportHistoric(dadosArray)
        fs.unlinkSync(arquivoImportado);
        return
    }
}