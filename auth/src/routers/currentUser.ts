import express from 'express'
const router = express.Router();
import { currentUser } from '../middleswares/currentUser';

router.get('/api/users/currentUser',currentUser,(req,res)=>{
    // console.log(req,req.currentUser,"req");
   res.send({currentUser:req.currentUser || null})
})

export {router as currentUserRouter}; 