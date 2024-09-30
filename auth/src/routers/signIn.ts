import express,{Response,Request} from 'express'
import { body } from 'express-validator';
import { validateRequest } from '../middleswares/validateRequest';
import { User } from '../models/userModel';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../eroors/badRequestError';
const router = express.Router();

router.post('/api/users/signIn',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must enter a apassword')

],validateRequest,
async (req: Request,res: Response)=>{
    const {email,password} = req.body;
    const checkUser = await User.findOne({email:email});
    if(!checkUser){
       throw new BadRequestError('Invalid credentials')
    }
    const passwordMatch = await Password.compare(
        checkUser.password,
        password
    );
    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials')
    }
    // generate tocken

    const userJwt = jwt.sign({
        id:checkUser.id,
        fname:checkUser.fname,
        lname:checkUser.lname,
        email:checkUser.email,
        password:checkUser.password,
    },process.env.JWT_KEY!);


    // store on session

    req.session = {
        jwt: userJwt
    };

    res.status(200).send(checkUser);
    // console.log(" user login");
})

export {router as signInRouter};