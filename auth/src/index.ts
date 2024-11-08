import mongoose from 'mongoose';
import { app } from './app';
const start = async()=>{
    console.log("hi This From auth/Index.ys");
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY ust be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI ust be defined')
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb");
    } catch (err) {
         console.error(err)
    }
    app.listen(3000,()=>console.log("3000 running"))
};

start();