import request from 'supertest';
import {app} from '../../app';

it('cleare the cookie after signout', async () =>{
    await request(app)
   .post('/api/users/signUp')
   .send({
     fname:"ansif",
     lname:"pk",
     email:"ansifpk@gmail.com",
     password:"12345678",
   })
   .expect(201)
   const response = await request(app)
        .post('/api/users/signOut')
        .send({})
        .expect(200);
    const cookie = response.get('Set-Cookie')
    expect(cookie).toBeDefined();
    expect(cookie?.[0]).toEqual(
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
 })
 