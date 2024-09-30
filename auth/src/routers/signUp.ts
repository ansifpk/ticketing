import express,{Request,Response} from 'express'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middleswares/validateRequest';
import { User } from '../models/userModel';
import { BadRequestError } from '../eroors/badRequestError';


const router = express.Router();

router.post('/api/users/signUp',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min:4,max:10})
    .withMessage('Password must be in between 4 and 10')
],validateRequest,
async (req: Request,res: Response)=>{
    const {fname,lname,password,email} = req.body;
    const checkUser = await User.findOne({email:email});
    if(checkUser){
       throw new BadRequestError('Email already Exists')
    }
    const user =  User.build({
        fname:fname,
        lname:lname,
        email:email,
        password:password
    })
    await user.save();

    // generate tocken

    const userJwt = jwt.sign({
        id:user.id,
        fname:user.fname,
        lname:user.lname,
        email:user.email,
        password:user.password,
    },process.env.JWT_KEY!);


    // store on session

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
    // console.log("creatoing user");
});

export {router as signUpRouter};