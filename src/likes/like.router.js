import express from "express";
import { likeController } from "./like.controller.js";
import { authenticate } from "../middlewares/jwtToke.js";

const likeRouter= express.Router();

const LikeController= new likeController();

likeRouter.post("/post/:postId",authenticate,(req,res,next)=>{
    LikeController.LikePost(req,res,next);
});
likeRouter.post("/comment/:commentId",authenticate,(req,res,next)=>{
    LikeController.LikeComment(req,res,next);
});
export default likeRouter