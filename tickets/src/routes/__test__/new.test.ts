import request  from "supertest";
import { app } from "../../app";
import {signIn} from  '../../test/signIn'
import { Ticket } from "../../models/ticketModel";
import { natsWrapper } from "../../nats-wrapper";


it('has a route handler ot /api/tickets fro post requests',async () => {
    const response = await request(app)
    .post('/api/tickets')
    .send({});
    expect(response.status).not.toEqual(404)
});
it('can only access if the user is signed in',async () => {
    await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});
it('return other than 401  rstatus  when user is sign in',async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie',signIn())
    .send({});
    expect(response.status).not.toEqual(401)
});
it('return error if invalid title provide',async () => {
   await request(app)
    .post('/api/tickets')
    .set('Cookie',signIn())
    .send({
        title:'',
        price:10
    })
    .expect(400)
     await request(app)
        .post('/api/tickets')
        .set('Cookie',signIn())
        .send({
            price:10
        })
        .expect(400)
  
});
it('return error if invalid price provide',async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie',signIn())
    .send({
        title:'ARM',
        price:-10
    })
    .expect(400)
    await request(app)
        .post('/api/tickets')
        .set('Cookie',signIn())
        .send({
            title:'ARM',
        })
        .expect(400)
});
it('cretae a ticket with valid inputes',async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    await request(app)
    .post('/api/tickets')
    .set('Cookie',signIn())
    .send({
        title:'ARM',
        price:20
    })
    .expect(201)

     tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual('ARM');
});

it('publish an event', async () => {
   const title = 'KGF2'
   await request(app)
   .post('/api/tickets')
   .set('Cookie',signIn())
   .send({
    title:title,
    price:20,
   })
   .expect(201)
 expect(natsWrapper.client.publish).toHaveBeenCalled();
 
})