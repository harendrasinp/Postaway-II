import jwt from "jsonwebtoken";

export const authenticate=(req,res,next)=>{
    const {authToken}=req.cookies;
    jwt.verify(authToken,"Htz8oD9ize2fOzoF8rbxqXshKnw3zyMb",(err,data)=>{
        if(err){
            res.status(403).send("Authentication Failed, Please Login....!!!");
        }
        else{
            req.userid=data.id;
            next();
        }
    })
}