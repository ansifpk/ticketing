import { Response,Request,NextFunction } from "express"
import jwt from 'jsonwebtoken';

interface UserPayload {
    id:string,
    email:string,
    fname:string,
    lname:string,
    password:string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request,res: Response, next:NextFunction)=>{
    if(!req.session?.jwt){
        return next();
    }
    try {
        const payoad = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload;
        req.currentUser = payoad;
        // res.send({currentUser:payoad})
    } catch (err) {}
    next();
}