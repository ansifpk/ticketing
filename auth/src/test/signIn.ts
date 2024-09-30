import request from 'supertest';
import { app } from '../app';
const signIn = async () => {
    const email = 'ansifpk@gmail.com'
    const password = '12345678'
  
    const res = await request(app)
    .post('/api/users/signUp')
    .send({
      email,
      password,
      fname:"ansif",
      lname:"pk"
    })
    .expect(201);
    const cookie = res.get('Set-Cookie');
    return cookie
  }

  export {signIn}