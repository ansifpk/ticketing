import express,{Request,Response} from 'express';
import { requireAuth } from '../middleswares/requireAuth';
import { Order, OrderStatus } from '../models/orderModel';
import { NotFoundError } from '../eroors/notFounderror';
import { NotAuthorizedError } from '../eroors/notAutherizedError';
import { natsWrapper } from '../nats-wrapper';
import { OrderCancelledPublisher } from '../events/publishers/orderCancelledPublisher';
import { Ticket } from '../models/ticketModel';

const router = express.Router()

router.delete('/api/orders/:orderId',requireAuth,async (req:Request,res:Response) =>{
   const orderId = req.params;
  const order  = await Order.findById(orderId).populate('ticket')
   if(!order){
     throw new NotFoundError()
   }
   if(order.userId !== req.currentUser!.id){
     throw new NotAuthorizedError()
   }
   order.status = OrderStatus.Cancelled
   await order.save()
   // pub an event this was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
    id:order.id,
    version:order.version,
    ticket:{
      id:order.ticket.id
    },
   })
   res.status(204).send(order)
})

export {router as deleteOrderRouter}