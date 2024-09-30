import { Message } from "node-nats-streaming";
import { Subjects } from "../subjects";
import { Listener } from "./base-listener";
import { OrderCreatedEvent } from "./order-created-event";
import { queueGroupName } from "./queue-goup-names";
import { Order } from "../../models/orderModel";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
   subject:Subjects.OrderCreated= Subjects.OrderCreated;
   queueGroupName=queueGroupName;
   async onMessage(data:OrderCreatedEvent['data'],msg:Message){
         const order = Order.build({
            id:data.id,
            price:data.ticket.price,
            status:data.status,
            userId:data.userId,
            version:data.version
         });
         await order.save();
         msg.ack()
   }
}