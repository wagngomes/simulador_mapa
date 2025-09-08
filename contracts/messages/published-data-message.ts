export interface PublishedDataMessage {
  cenario_id: string
  items: Array<{
    ds: string
    y: number
    cd: string
    codigo_produto: string
  }>
}