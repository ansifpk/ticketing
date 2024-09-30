import request from 'supertest';
import {app} from '../../app';
import { signIn } from '../../test/signIn';


it('responds with details of  current user',async()=>{
    const cookie = await signIn();
    if (!cookie || !cookie[0]) {
      throw new Error('Cookie was not set properly after signup');
  }
   const response = await request(app)
   .get('/api/users/currentUser')
   .set('Cookie',cookie)
   .send()
   .expect(200);
   expect(response.body.currentUser.email).toEqual("ansifpk@gmail.com");
   
})

it('responds with null of  not authenticated user',async()=>{
  
   const response = await request(app)
   .get('/api/users/currentUser')
   .send()
   .expect(200);
   expect(response.body.currentUser).toEqual(null);
   
})