import { PrismaRepository } from "../../repositories/prisma-repository"
import { UpdateSimulationStatusUseCase } from "../../services/updateSimulationStatus"
import { simulationStatus } from "../channels/getSimulationStatus"


let updateSimulationStatus: UpdateSimulationStatusUseCase
let prismaRepository: PrismaRepository

prismaRepository = new PrismaRepository()
updateSimulationStatus = new UpdateSimulationStatusUseCase(prismaRepository)

export function consumeSimulationStatus() {
  simulationStatus.consume("simulationStatus", async (message) => {
    if (!message) return

    const payload = JSON.parse(message.content.toString())
    console.log("Mensagem recebida:", payload)

    await updateSimulationStatus.execute({...payload})

    // confirma para o RabbitMQ que a mensagem foi processada
    simulationStatus.ack(message)
  })
}
