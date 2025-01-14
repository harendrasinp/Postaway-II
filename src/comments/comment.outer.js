import express from "express";
import { commentController } from "./comment.controller.js";
import { authenticate } from "../middlewares/jwtToke.js";

const commentRouter=express.Router();

const CommentController= new commentController();

commentRouter.post("/:postId",authenticate,(req,res,next)=>{
    CommentController.AddComment(req,res,next);
});
commentRouter.get("/:postId",authenticate,(req,res,next)=>{
    CommentController.GetComment(req,res,next);
});
commentRouter.put("/:commentId",authenticate,(req,res,next)=>{
    CommentController.UpdateComment(req,res,next);
});
commentRouter.delete("/:commentId",authenticate,(req,res,next)=>{
    CommentController.DeleteComment(req,res,next);
});


export default commentRouter;