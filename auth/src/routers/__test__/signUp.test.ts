import request from 'supertest';
import { app } from '../../app';


it("return a 201 on success signup",async()=>{
    return request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        email:"ansifpk@gmail.com",
        password:"12345678"
    })
    .expect(201);
});

it("return a 400 with an invalid email",async()=>{
    return request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        email:"ansifpkgmailcom",
        password:"12345678"
    })
    .expect(400);
});

it("return a 400 with an invalid password",async()=>{
    return request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        email:"ansifpk@gmail.com",
        password:"12"
    })
    .expect(400);
});

it("return a 400 with missing email and password",async()=>{
    await request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        email:"ansifpk@gmail.com"
    })
    .expect(400);
    await request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        password:"12345678"
    })
    .expect(400);
});

it("dublicate email",async()=>{
    await request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        email:"ansifpk@gmail.com",
        password:"12345678"
    })
    .expect(201);
    await request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        password:"12345678"
    })
    .expect(400);
});
it("set a cookie after signup",async()=>{
    const response = await request(app)
    .post('/api/users/signUp')
    .send({
        fname:"ansif",
        lname:"pk",
        email:"ansifpk@gmail.com",
        password:"12345678"
    })
    .expect(201);
  
    expect(response.get('Set-Cookie')).toBeDefined();
});