import mongoose from "mongoose";


export const signupSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"friend",
    }]
})