import mongoose, { mongo } from "mongoose";

export const postSchema = mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
    },
    image:{
        type:String,
        required: true
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    }],
    comments:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
       }
    ],
})