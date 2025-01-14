import express from "express";
import { userController } from "./user.controller.js";
import { authenticate } from "../middlewares/jwtToke.js";
// -----------------------------------------------------------------------------
const signupRouter=express.Router();

const UserController= new userController();
// ------------------------------------------------------------------------------
signupRouter.post("/signup",(req,res,next)=>{
    UserController.signupPost(req,res,next);
});
signupRouter.post("/login",(req,res,next)=>{
    UserController.login(req,res,next);
});
signupRouter.get("/logout",authenticate,(req,res,next)=>{
    UserController.logOut(req,res,next);
});
signupRouter.get("/get-detail/:userid",authenticate,(req,res,next)=>{
    UserController.oneUserDetail(req,res,next);
});
signupRouter.get("/get-all-detail",authenticate,(req,res,next)=>{
    UserController.allUserData(req,res,next);
});
signupRouter.post("/update-detail/:userid",authenticate,(req,res,next)=>{
    UserController.updateUserData(req,res,next);
});
export default signupRouter;