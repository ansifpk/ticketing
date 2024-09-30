
import { CustomError } from "./customError";

export class DbConnectionError extends CustomError{
    statusCode = 500;
    reason = "db error";
    constructor(){
        super("db connecting to error");
        Object.setPrototypeOf(this,DbConnectionError.prototype);
    }
    serializeErrors(){
        return [{message:this.reason}]
    }
}
