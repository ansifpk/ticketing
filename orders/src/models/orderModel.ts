import mongoose from "mongoose";
import { OrderStatus } from "../types/orderStatus";
import { TicketDoc } from "./ticketModel";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export {OrderStatus}
interface OrderAttrs {
    userId:string;
    status:OrderStatus;
    expiresAt:Date;
    ticket:TicketDoc;
}
interface OrderDoc extends mongoose.Document {
    userId:string;
    status:OrderStatus;
    expiresAt:Date;
    ticket:TicketDoc;
    version:number;
}
interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs:OrderAttrs):OrderDoc;
}
const orderschema = new mongoose.Schema({
       userId:{
        type:String,
        require:true
       },
       status:{
        type:String,
        require:true,
        enum:Object.values(OrderStatus),
        default:OrderStatus.Created
       },
       expiresAt:{
        type:mongoose.Schema.Types.Date
       },
       ticket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket'
       },
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id
        }
    }
})
orderschema.set('versionKey','version');
orderschema.plugin(updateIfCurrentPlugin);
orderschema.statics.build = (attrs:OrderAttrs) => {
    return new Order(attrs)
}

const Order = mongoose.model<OrderDoc,OrderModel>('Order',orderschema);
export {Order}