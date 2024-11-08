import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners.ts/ticketCreatedListener';
import { TicketUpdatedListener } from './events/listeners.ts/ticketUpdatedListener';
import { ExpirationCompleteListener } from './events/listeners.ts/expiration-complete-listener';
const start = async()=>{
    console.log("Starting.....");
    
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY ust be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI ust be defined')
    }
    if(!process.env.NATS_CLIENT_ID){
        throw new Error('MONGO_URI ust be defined')
    }
    if(!process.env.NATS_URL){
        throw new Error('MONGO_URI ust be defined')
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('MONGO_URI ust be defined')
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL)
        natsWrapper.client.on('close',()=>{
            console.log("NATS connection closed");
            process.exit()
        });
            process.on('SIGINT',()=>natsWrapper.client.close())
            process.on('SIGTERM',()=>natsWrapper.client.close())
             new TicketCreatedListener(natsWrapper.client).listen();
             new TicketUpdatedListener(natsWrapper.client).listen();
             new ExpirationCompleteListener(natsWrapper.client).listen();
       
            await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb");
    } catch (err) {
         console.error(err)
    }
    app.listen(3000,()=>console.log("3000 running"))
};

start();