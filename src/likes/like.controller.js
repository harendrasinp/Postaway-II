import { ApplicationError } from "../middlewares/ErrorHandling.js";
import { likeRepository } from "./like.repository.js";


export class likeController{
    constructor(){
        this.likeRepo= new likeRepository();
    }

    async LikePost(req,res,next){
       try{
        const userid=req.userid;
        const {postId}=req.params;
        const likeStatus=await this.likeRepo.likePost(userid,postId);
        if(!likeStatus.success){
            throw new ApplicationError(likeStatus.message,likeStatus.come)
        }
        res.status(200).send({status:likeStatus.message})
       }catch(err){
        next(err);
       }
    };

    async LikeComment(req,res,next){
        try{
            const userid=req.userid;
            const {commentId}=req.params;
            const commentStatus=await this.likeRepo.likeComment(userid,commentId);
            if(!commentStatus.success){
                throw new ApplicationError(commentStatus.message,commentStatus.come)
            }
            res.status(200).send({status:commentStatus.message})
           }catch(err){
            next(err);
           }
    }
}