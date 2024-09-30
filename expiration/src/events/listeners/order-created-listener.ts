import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queus/expiration-queue";
import { OrderStatus } from "../../types/orderStatus";
import { Listener } from "./base-listeners";
import { OrderCreatedEvent } from "./order-created-event";
import { queueGroupName } from "./queue-group-name";
import { Subjects } from "./subjects";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated=Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    
    async onMessage(data:OrderCreatedEvent['data'],msg:Message){
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
         console.log("waiting this millisecond to preceed",delay);
         
        await expirationQueue.add(
            {
                orderId: data.id
            },
            {
                delay:delay
            }
        )
            msg.ack();
    }
}