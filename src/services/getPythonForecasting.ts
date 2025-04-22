export class GetPythonForecasting {
    constructor(private HistoricRepository: any){
    }
    
    async execute(){

        const controller = new AbortController() /***************** */
        const timeout = setTimeout(() => controller.abort(), 1200000) // 90s /***************** */

        const historic = await this.HistoricRepository.getHistoricData()

        const formattedData = historic.map((item: any) => ({
            ds: item.data,
            y: Number(item.quantity),
            cd: item.cd,
            codigo_produto: item.product
          }))
        const response = await fetch ('http://localhost:8000/forecast',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            signal: controller.signal, /***************** */
            body: JSON.stringify({items:formattedData}),
            
        })
        if (!response.ok) {
            throw new Error(`Erro ao chamar o forecasting: ${response.status}`)
        }
        const data = await response.json()
        clearTimeout(timeout)
        return data       
    }
}