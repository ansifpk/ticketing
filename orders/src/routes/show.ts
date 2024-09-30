import express,{Request,Response} from 'express';
import { requireAuth } from '../middleswares/requireAuth';
import { Order } from '../models/orderModel';
import { NotAuthorizedError } from '../eroors/notAutherizedError';
import { NotFoundError } from '../eroors/notFounderror';

const router = express.Router()

router.get('/api/orders/:orderId',requireAuth,async (req:Request,res:Response) =>{
   const order  = await Order.findById(req.params.orderId).populate('ticket')
    if(!order){
      throw new NotFoundError()
    }
    if(order.userId !== req.currentUser!.id){
      throw new NotAuthorizedError()
    }
   res.send(order)
})

export {router as showOrderRouter}