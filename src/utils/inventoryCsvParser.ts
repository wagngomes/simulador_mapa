export interface InventoryInterface {
    codigo: string
    filial: string
    id: string
    rota: string
    m4: number
    m3: number
    m2: number
    m1: number
    forecast: number
    estoque_in: number
    estoque_livre: number
    compras: number
    transferencias: number
    estoque_total: number
    cmv: number
    mediaSimples: number
    ultimoMes: number
    novaMedia: number
    menorVenda: number
    maiorVenda: number
    mediaPonderada: number
}

export function InventoryParse (row: InventoryInterface){
    let linhaDeSaldo = {
    codigo: row.codigo,
    filial: row.filial,
    id: row.codigo + row.filial,
    rota: row.rota,
    m4: Number(row.m4 !== undefined ? row.m4 : 0),
    m3: Number(row.m3 !== undefined ? row.m3 : 0),
    m2: Number(row.m2 !== undefined ? row.m2 : 0),
    m1: Number(row.m1 !== undefined ? row.m1 : 0),
    forecast: Number(row.forecast !== undefined ? row.forecast : 0),
    estoque_in: Number(row.estoque_in !== undefined ? row.estoque_in : 0),
    estoque_livre: Number(row.estoque_livre !== undefined ? row.estoque_livre : 0),
    compras: Number(row.compras !== undefined ? row.compras : 0),
    transferencias: Number(row.transferencias !== undefined ? row.transferencias : 0),
    estoque_total: Number(row.estoque_total !== undefined ? row.estoque_total : 0),
    cmv: Number(row.cmv !== undefined ? row.cmv : 0),
    mediaSimples: Number((row.m1 + row.m2 + row.m3) / 3),
    ultimoMes: Number(row.m1),
    novaMedia: Number((row.forecast + row.m1 + row.m2) / 3),
    menorVenda: Number(row.m1 || 0),
    maiorVenda: Number(row.m1 || 0),
    mediaPonderada: Number(row.m1 * 0.4 + row.m2 * 0.3 + row.m3 * 0.2 + row.m4 * 0.1)
    }
    return  linhaDeSaldo
}