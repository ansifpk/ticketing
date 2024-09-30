import express, {Request,Response} from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleswares/requireAuth';
import { validateRequest } from '../middleswares/validateRequest';
import { Ticket } from '../models/ticketModel';
import { TicketCreatePublisher } from '../events/publishers/create/ticket-create-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router()

router.post('/api/tickets',requireAuth,
    [
        body('title')
        .not()
        .isEmpty()
        .withMessage('Title is Required'),
        body('price')
        .isFloat({gt:0})
        .withMessage('Price must be Greater than Zero')
    ],
    validateRequest,
    async (req:Request,res:Response) => {
  
   const {title,price} = req.body;
   const ticket = Ticket.build({
    title:title,
    price:price,
    userId:req.currentUser!.id
   });
   await ticket.save();
    await new TicketCreatePublisher(natsWrapper.client).publish({
    id:ticket.id,
    title:ticket.title,
    price:ticket.price,
    userId:ticket.userId,
    version:ticket.version
   })
   res.status(201).send(ticket)
})

export {router as createTicketRouter};