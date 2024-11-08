import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from './eroors/notFounderror';
import { errorHandler } from './middleswares/error-handler';
import { currentUser } from './middleswares/currentUser';

import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes/index';
import { showOrderRouter } from './routes/show';

const app =express() 
app.set('trust proxy',true);
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser)
app.use(deleteOrderRouter)
app.use(newOrderRouter)
app.use(indexOrderRouter)
app.use(showOrderRouter)

app.all('*', async (req,res)=>{
    throw new NotFoundError();
})

app.use(errorHandler)

export {app}