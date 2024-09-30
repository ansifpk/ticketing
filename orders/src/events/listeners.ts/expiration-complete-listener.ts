import { Message } from "node-nats-streaming";
import { Subjects } from "../subjects";
import { Listener } from "./base-listener";
import { ExpirationCompleteEvent } from "./expiration-completed-event";
import { queueGroupName } from "./queueGroupName";
import { Order, OrderStatus } from "../../models/orderModel";
import { OrderCancelledPublisher } from "../publishers/orderCancelledPublisher";


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
     queueGroupName = queueGroupName;
     subject:Subjects.ExpirationComplete=Subjects.ExpirationComplete;

     async onMessage(data:ExpirationCompleteEvent['data'],msg:Message){
        const order = await Order.findById(data.orderId)
      if(!order){
        throw new Error('Order Not Found');
      }

      order.set({
       status:OrderStatus.Cancelled,
  
      })

      await order.save();
      await new OrderCancelledPublisher(this.client).publish({
        id:order.id,
        version:order.version,
        ticket:{
            id:order.ticket.id
        }
      });
      msg.ack()
    }
}