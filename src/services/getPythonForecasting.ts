export class GetPythonForecasting {
    constructor(private HistoricRepository: any){
    }

    async execute(){

        const historic = await this.HistoricRepository.getHistoricData()

        function formatDate(dateStr: string): string {
            const [day, month, year] = dateStr.split('-')
            return `${year}-${month}-${day}`
          }

        const formattedData = historic.map((item: any) => ({
            ds: formatDate(item.data), // transforma para '2024-02-01'
            y: Number(item.quantity),
            cd: item.cd,
            codigo_produto: item.product
          }))

        const response = await fetch ('http://localhost:8000/forecast',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items:formattedData})

        })
        if (!response.ok) {
            throw new Error(`Erro ao chamar o forecasting: ${response.status}`)
        }
        const data = await response.json()
        return data
       
    }
}