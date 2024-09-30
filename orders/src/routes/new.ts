import express,{Request,Response} from 'express';
import { requireAuth } from '../middleswares/requireAuth';
import { validateRequest } from '../middleswares/validateRequest';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticketModel';
import { Order, OrderStatus } from '../models/orderModel';
import { NotFoundError } from '../eroors/notFounderror';
import { BadRequestError } from '../eroors/badRequestError';
import { OrderCreatedPublisher } from '../events/publishers/orderCreatedPublisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router()
const EXPIRATION_WINDOW_SECONDS = 1 * 60;
router.post('/api/orders',requireAuth,[
   body('ticketId')
   .not()
   .isEmpty()
   .custom((input:string)=>mongoose.Types.ObjectId.isValid(input))
   .withMessage('Provide a Ticket')
],validateRequest,async (req:Request,res:Response) =>{
   const {ticketId} = req.body
  
   // fin dthe ticke is user is try to orde in dbs
   const ticket = await Ticket.findById(ticketId)
   if(!ticket){
      throw new NotFoundError();
   }
   // make sure teh ticket is already reseved somone
   // run query to fin alll orders. find order where the ticket is 
   // is teh ticket we found and teh order status is not cancelled
   // if we find order from that means tah ticket is reserved
   const isReserved = await ticket.isReserved()
   if(isReserved){
      throw new BadRequestError('Ticket is Already Reserved')
   }
  
   //calcuete expr date fr order
const expiration = new Date() ;
expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
   // build order save it db
      const order = Order.build({
         userId:req.currentUser!.id,
         status:OrderStatus.Created,
         expiresAt:expiration,
         ticket
      });
      await order.save()
   // bul-lish an even order cretae
    new OrderCreatedPublisher(natsWrapper.client).publish({
       id:order.id,
       version:order.version,
       status:OrderStatus.Created,
       userId:order.userId,
       expiresAt:order.expiresAt.toISOString(),
       ticket:{
         id:ticket.id,
         price:ticket.price
       }
   });
    res.status(201).send({order})

})

export {router as newOrderRouter}