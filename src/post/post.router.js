import express from "express";
import {postController} from "./post.controller.js";
import { authenticate } from "../middlewares/jwtToke.js";
import { upload } from "../middlewares/multer.setup.js";
const postRouter= express.Router();

const PostController= new postController();

postRouter.post("/",authenticate,upload.single("image"),(req,res,next)=>{
    PostController.CreatePost(req,res,next);
});
postRouter.get("/:postId",authenticate,(req,res,next)=>{
    PostController.fincPostByid(req,res,next);
});
postRouter.get("/",authenticate,(req,res,next)=>{
    PostController.retriveUserAllPost(req,res,next);
});
postRouter.delete("/:postId",authenticate,(req,res,next)=>{
    PostController.deletePost(req,res,next);
});
postRouter.put("/:postId",authenticate,upload.single("image"),(req,res,next)=>{
    PostController.updatePost(req,res,next);
});



export default postRouter;