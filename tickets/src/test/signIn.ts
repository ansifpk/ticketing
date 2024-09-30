import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
const signIn =  () => {
   // build a jwt paulod {id,email}
   const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email:'ansifpk@gmail.com'
   }

   // cretae the jwt 
   const tocken = jwt.sign(payload,process.env.JWT_KEY!)

   // build a session object {jwt,MY_JWT}
  const session = {jwt: tocken};
  // turn the session into JSON
  
  const sessionJSON  = JSON.stringify(session);

  // take json and encode it as base64

  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cokie with the encoded data 
    return [`session=${base64}`];
}

  export {signIn}