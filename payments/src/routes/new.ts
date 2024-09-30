import express,{Request,Response} from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleswares/requireAuth';
import { validateRequest } from '../middleswares/validateRequest';
import { Order } from '../models/orderModel';
import { NotFoundError } from '../eroors/notFounderror';
import { NotAuthorizedError } from '../eroors/notAutherizedError';
import { OrderStatus } from '../types/orderStatus';
import { BadRequestError } from '../eroors/badRequestError';
import { stripe } from '../stripe';

const router = express.Router();

router.post('/api/payments',requireAuth,[
body('tocken').not().isEmpty(),body('orderId').not().isEmpty()
],validateRequest,async(req:Request,res:Response)=>{
    // const {tocken,orderId}=req.body
    // const order = await  Order.findById(orderId)
    // if(!order){
    //     throw new NotFoundError()
    // }
    // if(order.userId !== req.currentUser!.id){
    //     throw new NotAuthorizedError()
    // }
    // if(order.userId == OrderStatus.Cancelled){
    //     throw new BadRequestError('Cannot pay for an cancelled order');
    // }
    // await stripe.charges.create({
    //     currency:'usd',
    //     amount:order.price*100,
    //     source:tocken
    // });
  res.send({success:true});
})

export {router as paymentsRouter}