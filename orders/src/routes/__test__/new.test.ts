import mongoose from "mongoose";
import request from 'supertest';
import { app } from "../../app";
import { signIn } from "../../test/signIn";
import { Ticket } from "../../models/ticketModel";
import { OrderStatus } from "../../types/orderStatus";
import { Order } from "../../models/orderModel";
const buildTicket = async()=>{
   const ticket =  Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title:"sports",
        price:20,
    })
    await ticket.save();
    return ticket;
}

it("fetch orders for a perticular user",async()=>{
     const t1 = await buildTicket();
     const t2 = await buildTicket();
     const t3 = await buildTicket();

const userOne = signIn()
const userOTwo = signIn()
    await request(app)
    .post('/api/orders')
    .set('Cookie',signIn())
    .send({ticketId:t1.id})
    .expect(201)
})
it("reqt error if ticket already reserved",async()=>{
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title:"sports",
        price:20,
    });
    const order = Order.build({
        ticket,
        userId:"dgshgsg",
        status:OrderStatus.Created,
        expiresAt:new Date()
    })
    await order.save();
    await request(app)
    .post('/api/orders')
    .set('Cookie',signIn())
    .send({ticketId:ticket.id})
    .expect(400)
})
it("reserves a ticket ",async()=>{
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title:"sports",
        price:20,
    });
    await ticket.save();

    await request(app)
    .post('/api/orders')
    .set('Cookie',signIn())
    .send({ticketId:ticket.id})
    .expect(201)
})
it("reqt error if ticket not exist",async()=>{

})