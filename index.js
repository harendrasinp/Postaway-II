import express from "express";
import signupRouter from "./src/user/user.router.js";
import postRouter from "./src/post/post.router.js";
import likeRouter from "./src/likes/like.router.js";
import friendshipRouter from "./src/friendship/friendshi.router.js";
import { customeErrorhandleMiddlware } from "./src/middlewares/ErrorHandling.js";
import cookieParser from "cookie-parser";
import commentRouter from "./src/comments/comment.outer.js";

const server= express();
server.use(cookieParser());
server.use(express.json()); // For JSON request bodies
// server.use(express.urlencoded({ extended: true })); 

server.use("/api/user",signupRouter);
server.use("/api/posts",postRouter);
server.use("/api/comment",commentRouter);
server.use("/api/likes",likeRouter);
server.use("/api/friendship",friendshipRouter);





server.use(customeErrorhandleMiddlware);
export default server