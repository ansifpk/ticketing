import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routers/currentUser';
import { signInRouter } from './routers/signIn';
import { signUpRouter } from './routers/signUp';
import { signOutRouter } from './routers/signOut';
import { errorHandler } from './middleswares/error-handler';
import { NotFoundError } from './eroors/notFounderror';
const app =express()
app.set('trust proxy',true);
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signOutRouter)
app.use(signInRouter)

app.all('*', async (req,res)=>{
    throw new NotFoundError();
})

app.use(errorHandler)

export {app}