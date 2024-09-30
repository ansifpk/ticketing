
import { Message } from "node-nats-streaming";
import { Subjects } from "../subjects";
import { Listener } from "./base-listener";
import { OrderCancelledEvent } from "./order-cancelled-event";
import { queueGroupName } from "./queue-goup-names";
import { Order } from "../../models/orderModel";
import { OrderStatus } from "../../types/orderStatus";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
   subject:Subjects.OrderCancelled= Subjects.OrderCancelled;
   queueGroupName=queueGroupName;
   async onMessage(data:OrderCancelledEvent['data'],msg:Message){
        const order  = await Order.findOne({
            _id:data.id,
            version:data.version - 1
        });
        if(!order){
            throw new Error('Order Not Found')
        };
        order.set({status:OrderStatus.Cancelled})
         await order.save();
         msg.ack()
   }
}