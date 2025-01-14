export class ApplicationError extends Error{
    constructor(message,code){
        super(message),
        this.code=code
    }
}

export const customeErrorhandleMiddlware=(err,req,res,next)=>{
    err.message=err.message||"Something went wrong from server side",
    err.code=err.code||500,
    res.status(err.code).send(err.message);
}