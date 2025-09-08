import {broker} from '../broker'

export const simulationStatus = await broker.createChannel()

await simulationStatus.assertQueue('simulationStatus')
