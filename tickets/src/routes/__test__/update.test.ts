import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signIn } from '../../test/signIn';
import { natsWrapper } from "../../nats-wrapper";

it('returns a  404 if the provided id is does not exist',async()=>{
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie',signIn())
      .send({
        title:'ARM',
        price:20
       })
       .expect(404);
})

it('returns a 401 if the  the user do not authenticated',async()=>{
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title:'ARM',
        price:20
       })
       .expect(401);
})
it('ret 401 if the id the user do not own the ticket',async()=>{
   const response = await request(app)
   .post('/api/tickets')
   .set('Cookie',signIn())
   .send({
    title:"ARM",
    price:20
   })
   await request(app)
     .put(`/api/tickets/${response.body.id}`)
     .set('Cookie',signIn())
     .send({
        title:"KGF",
        price:50
     })
     .expect(401)
})
it('ret 400 if the user provide invalid title or price',async()=>{
    const cookie = signIn()
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie',cookie)
        .send({
        title:"ARM",
        price:20
        })
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie',cookie)
      .send({
        title:"",
        price:20
        })
      .expect(400)
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie',cookie)
      .send({
        title:"KGF",
        price:-20
        })
      .expect(400)
})
it('update the tickets provide valid title and price',async()=>{
    const cookie = signIn()
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie',cookie)
        .send({
        title:"ARM",
        price:20
        })
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title:"KGF",
        price:50
    })
    .expect(200)
    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    expect(ticketResponse.body.title).toEqual('KGF')
    expect(ticketResponse.body.price).toEqual(50)
})

it('publish an event',async()=>{
  const cookie = signIn()
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie',cookie)
        .send({
        title:"ARM",
        price:20
        })
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title:"KGF",
        price:50
    })
    .expect(200)
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})