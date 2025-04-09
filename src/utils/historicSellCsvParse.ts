export interface HistoricSell {
    product: string
    data: string
    quantity: number
    cd: string
}

export function historicSellParse (row: HistoricSell){

    let historicLine = {
        product: row.product,
        data: row.data,
        quantity: Number(row.quantity||0),
        cd: row.cd
    }

    return historicLine
}

