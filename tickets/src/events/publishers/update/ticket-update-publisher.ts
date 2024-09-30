import { Publisher } from "../create/base-publisher";
import { TicketUpdateEvent } from "./ticket-update-event";
import { Subjects } from "../subjects";


export class TicketUpdatePublisher extends Publisher<TicketUpdateEvent>{
   subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
}
