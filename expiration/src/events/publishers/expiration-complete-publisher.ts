import { ExpirationCompleteEvent } from "../listeners/expiration-completed-event";
import { Subjects } from "../listeners/subjects";
import { Publisher } from "./base-publisher";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject:Subjects.ExpirationComplete=Subjects.ExpirationComplete
}
