import nats from 'node-nats-streaming'
import { TicketCreatePublisher } from './events/ticket-create-publisher'
console.clear();

const stan = nats.connect('tickets','abc',{
    url:'http://localhost:4222',
})

stan.on('connect',async()=>{
    console.log("Publisher connected to NATS");

    // const data = JSON.stringify({
    //     id:'123',
    //     title:'concert',
    //     price:20,
    // })
    // stan.publish('ticket:created',data,()=>{
    //     console.log("Event published");
    // })

    const publisher = await new TicketCreatePublisher(stan)
  try {
    await  publisher.publish({
        id:'123',
        title:'concert',
        price:20,
        version:0,
        userId:"123456789",
   })
  } catch (err) {
    console.error(err)
  }
})