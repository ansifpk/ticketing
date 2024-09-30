import request from 'supertest';
import {app} from '../../app';


it('failes when email is not register', async () =>{
   await request(app)
  .post('/api/users/signIn')
  .send({
    email:"ansifpk@gmail.com",
    password:"12345678",
  })
  .expect(400)
})

it('failes when password is incorrect', async () =>{
   await request(app)
    .post('/api/users/signUp')
    .send({
        email:"ansifpk@gmail.com",
        password:"12345678",
        fname:"ansif",
        lname:"pk"
    })
    .expect(201)
   await request(app)
        .post('/api/users/signIn')
        .send({
            email:"ansifpk@gmail.com",
            password:"1234567876",
        })
        .expect(400)
})

it('respond with an cookie', async () =>{
   await request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        email:"ansifpk@gmail.com",
        password:"12345678",
    })
    .expect(201)
    const respons = await request(app)
    .post('/api/users/signIn')
    .send({
        email:"ansifpk@gmail.com",
        password:"12345678",
    })
    .expect(200)
  expect(respons.get('Set-Cookie')).toBeDefined();
})