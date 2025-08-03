import { channels } from "../channels";
import type { PublishedDataMessage } from "../../../contracts/messages/published-data-message";

export function sendHistoricData(data: PublishedDataMessage){

    channels.historicData.sendToQueue('historicData', Buffer.from(JSON.stringify(data)))

}