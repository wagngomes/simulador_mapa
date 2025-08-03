import fs from 'node:fs'
import {parse} from 'csv'
import { InventoryParse } from '../utils/inventoryCsvParser';
import { InventoryInterface } from '../utils/inventoryCsvParser'
import { PrismaRepository } from '../repositories/prisma-repository';

export class InventoryUploadUseCase {

    constructor(private prismaRepository: PrismaRepository) { }

    async execute(path: string) {

        const arquivoImportado = path;
        const parser = fs
            .createReadStream(arquivoImportado)
            .pipe(parse({ columns: true, delimiter: ";" }))
        const dadosArray: InventoryInterface[] = []

        for await (const row of parser) {

            const linhaDeSaldo = InventoryParse(row)
            dadosArray.push(linhaDeSaldo);
        }
        await this.prismaRepository.createImportInventory(dadosArray)
        fs.unlinkSync(arquivoImportado);
        return
    }
}


