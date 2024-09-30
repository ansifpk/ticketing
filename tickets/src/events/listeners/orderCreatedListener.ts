import { Message } from "node-nats-streaming";
import { OrderStatus } from "../../types/orderStatus";
import { Subjects } from "../publishers/subjects";
import { Listener } from "./base-listener";
import { OrderCreatedEvent } from "./orderCreateEvent";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../../models/ticketModel";
import { TicketUpdatePublisher } from "../publishers/update/ticket-update-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject:Subjects.OrderCreated=Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data:OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id)
        if(!ticket){
            throw new Error('Tikcet Not Found')
        }
        ticket.set({orderId:data.id})
        await ticket.save();
        await new TicketUpdatePublisher(this.client).publish({
            id:ticket.id,
            price:ticket.price,
            title:ticket.title,
            userId:ticket.userId,
            orderId:ticket.orderId,
            version:ticket.version
        })
        msg.ack()
    }
}