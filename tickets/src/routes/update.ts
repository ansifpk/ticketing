import express,{Request,Response} from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleswares/validateRequest';
import { NotFoundError } from '../eroors/notFounderror';
import { NotAuthorizedError } from '../eroors/notAutherizedError';
import { requireAuth } from '../middleswares/requireAuth';
import { Ticket } from '../models/ticketModel';
import { TicketUpdatePublisher } from '../events/publishers/update/ticket-update-publisher';
import { natsWrapper } from '../nats-wrapper';
import { BadRequestError } from '../eroors/badRequestError';
const router = express.Router();

router.put('/api/tickets/:id',requireAuth,[
    body('title')
    .not()
    .isEmpty()
    .withMessage('Tile is Required'),
    body('price')
    .isFloat({gt:0})
    .withMessage('Price mustbe Be Positive ')
],validateRequest,async (req:Request,res:Response)=>{
   const ticket = await Ticket.findById(req.params.id)
   if(!ticket){
    throw new NotFoundError();
   }
if(ticket.orderId){
   throw new BadRequestError('Cannot Edit a reserved Ticket')
}
   if(ticket.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
   }

   ticket.set({
    title:req.body.title,
    price:req.body.price,
   });
   await ticket.save();
    new TicketUpdatePublisher(natsWrapper.client).publish({
      id:ticket.id,
      title:ticket.title,
      price:ticket.price,
      userId:ticket.userId,
      version:ticket.version
   });
   res.send(ticket)
})

export {router as updateTicketRouter}