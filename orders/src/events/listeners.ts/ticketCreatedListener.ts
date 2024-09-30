import { Message } from "node-nats-streaming";
import { Subjects } from "../subjects";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "../ticketCreatedEvents";
import { Ticket } from "../../models/ticketModel";
import { queueGroupName } from "./queueGroupName";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
   subject:Subjects.TicketCreated = Subjects.TicketCreated;
   queueGroupName =queueGroupName; 
  async onMessage(data:TicketCreatedEvent['data'],msg:Message){
      const {id,title,price} = data;
      const ticket = Ticket.build({
         //ivade 
        id,
        title,
        price
      })
      await ticket.save();
      msg.ack();
   }
} 