import mongoose from "mongoose";

const  friendshiSchema=mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"signup",
        required:true
    },
    FriendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"signup",
        required:true
    },
    requestStatus:{
        type:String,
    }
    
});

export const friendsModel= new mongoose.model("friend",friendshiSchema);