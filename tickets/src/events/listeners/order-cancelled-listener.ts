import { OrderCancelledEvent } from "./order-cancelled-event";
import { Listener } from "./base-listener";
import { Subjects } from "../publishers/subjects";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticketModel";
import { TicketUpdatePublisher } from "../publishers/update/ticket-update-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
   subject: Subjects.OrderCancelled =Subjects.OrderCancelled;
   queueGroupName=queueGroupName;
   async onMessage(data: OrderCancelledEvent['data'],msg: Message){
        const ticket = await Ticket.findById(data.ticket.id)
        if(!ticket){
            throw new Error('Ticket not Fount')
        }
        ticket.set({orderId:undefined});
        await ticket.save();
        await new TicketUpdatePublisher(this.client).publish({
            id:ticket.id.toString(),
            orderId:ticket.orderId,
            userId:ticket.userId,
            price:ticket.price,
            title:ticket.title,
            version:ticket.version
        });
        msg.ack()
   }
}