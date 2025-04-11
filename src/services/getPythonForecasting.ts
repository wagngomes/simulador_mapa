

export class GetPythonForecasting {

    constructor(private HistoricRepository: any){

    }

    async execute(){

        const historic = await this.HistoricRepository.getHistoricData()

        const response = await fetch ('http://localhost:8080/forecast',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(historic)

        })
        if (!response.ok) {
            throw new Error(`Erro ao chamar o forecasting: ${response.status}`)
        }

        const data = await response.json()
        return data


    }
}