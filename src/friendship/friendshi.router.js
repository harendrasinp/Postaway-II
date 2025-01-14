import express from "express";
import { friendshipController } from "./friendshi.cotroller.js";
import { authenticate } from "../middlewares/jwtToke.js";

const friendshipRouter= express.Router();


const FriendshipController= new friendshipController();

friendshipRouter.post("/friendreq/:friendId",authenticate,(req,res,next)=>{
    FriendshipController.FriendshipReq(req,res,next);
});
friendshipRouter.get("/friendreq/",authenticate,(req,res,next)=>{
    FriendshipController.GetPendingFriendReq(req,res,next);
});
friendshipRouter.post("/accept/:friendId",authenticate,(req,res,next)=>{
    FriendshipController.AcceptRequest(req,res,next);
});

export default friendshipRouter;