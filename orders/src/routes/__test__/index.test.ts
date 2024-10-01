import mongoose from "mongoose";
import request from 'supertest';
import { app } from "../../app";
import { signIn } from "../../test/signIn";
import { Ticket } from "../../models/ticketModel";
import { OrderStatus } from "../../types/orderStatus";
import { Order } from "../../models/orderModel";


it("returns error if ticket not exist",async()=>{
    // create 3 tickets
    const ticketId = new mongoose.Types.ObjectId();
    await request(app)
    .post('/api/orders')
    .set('Cookie',signIn())
    .send({ticketId})
    .expect(404)
})