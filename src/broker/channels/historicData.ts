import { broker } from "../broker";

export const historicData = await broker.createChannel()

await historicData.assertQueue('historicData')