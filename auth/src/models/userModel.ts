// import mongoose from 'mongoose'
// import { Password } from '../services/password'

// // an interface that describes the properties
// // that are required to create a new user

// interface UserAttrs {
//     fname:string,
//     lname:string,
//     email:string,
//     password:string,
// }
// // an interface the describe the properties that user model have.

// interface UserModel extends mongoose.Model<UserDoc>{
//     build(attrs:UserAttrs):UserDoc;
// }

// // an interface that describes the properties
// // that a user document has.

// interface UserDoc extends mongoose.Document{
//     fname:string,
//     lname:string,
//     email:string,
//     password:string,
// }

// const userScheema = new mongoose.Schema({
//     fname:{
//         type:String,
//         required:true
//     },
//     lname:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// },{
//     toJSON:{
//         transform(doc,ret){
//             ret.id = ret._id
//             delete ret.password;
//             delete ret.__v;
//             delete ret._id;
//         }
//     }
// });
// userScheema.pre('save', async function(done){
//    if(this.isModified('password')){
//      const hashed = await Password.toHash(this.get('password'))
//      this.set('password',hashed);
//    }
//    done();
// })
// userScheema.statics.build = (attrs:UserAttrs)=>{
//     return new User(attrs)
// }
// const User = mongoose.model<UserDoc,UserModel>('User',userScheema)
// const a = User.build({
//     fname:"snid",
//     lname:"pk",
//     email:"ansdsd",
//     password:'12345678'
// })
// export { User };


import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {
    fname:string,
    lname:string,
    email:string,
    password:string,
}

interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs:UserAttrs):UserDoc;
}

interface UserDoc extends mongoose.Document{
    fname:string,
    lname:string,
    email:string,
    password:string,
}

const userScheema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    toJSON: {
      transform(doc,ret){
        ret.id = ret._id
        delete ret.password;
        delete ret.__v;
        delete ret._id;
      }
    }
});

userScheema.pre('save', async function(done){
   if(this.isModified('password')){
     const hashed = await Password.toHash(this.get('password'));
     this.set('password',hashed);
   }
   done();
})
userScheema.statics.build = (attrs:UserAttrs)=>{
    return new User(attrs)
}

const User = mongoose.model<UserDoc,UserModel>('User',userScheema)
export { User };

