import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-create-listener';
console.clear()
const stan = nats.connect('tickets',randomBytes(4).toString('hex'),{
    url:'http://localhost:4222',
})

stan.on('connect',async ()=>{
    console.log("listener connected to NATS");
    stan.on('close',()=>{
        console.log("NATS connection closed");
        process.exit()
    })
     new TicketCreatedListener(stan).listen()
})

process.on('SIGINT',()=>stan.close())
process.on('SIGTERM',()=>stan.close())

