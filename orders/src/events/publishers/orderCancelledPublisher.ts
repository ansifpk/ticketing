import { Publisher } from "../base-publisher";
import { OrderCancelledEvent } from "../orderCancelledEvent";
import { Subjects } from "../subjects";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
   subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}