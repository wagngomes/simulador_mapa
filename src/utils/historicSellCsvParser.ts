export interface HistoricSell {
    import_id: string,
    scenario_name: string
    scenario_tag: string
    scenario_description: string
    source_file: string
    product: string
    data: string
    quantity: number
    cd: string
}

export function historicSellParse(
    row: HistoricSell,
    import_id: string,
    scenario_name: string,
    scenario_tag: string,
    scenario_description: string,
    source_file: string) {
    let historicLine = {
        import_id: import_id,
        scenario_name: scenario_name,
        scenario_tag: scenario_tag,
        scenario_description: scenario_description,
        source_file: source_file,
        product: row.product,
        data: row.data,
        quantity: Number(row.quantity || 0),
        cd: row.cd
    }
    return historicLine
}

