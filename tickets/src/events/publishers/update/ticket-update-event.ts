import { Subjects } from "../subjects"; 

export interface TicketUpdateEvent {
    subject: Subjects.TicketUpdated;
    data:{
        id:string;
        title:string;
        version:number;
        price:number;
        userId:string;
        orderId?:string;
    };
};