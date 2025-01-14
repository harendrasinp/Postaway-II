import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// const URL=process.env.MONGO;
const URL="mongodb+srv://haren111990:xTXeAucO6DlpMdZH@postway.1bfqp.mongodb.net/?retryWrites=true&w=majority&appName=POSTWAY"
console.log(URL);
const MongoDbConnection= async()=>{
    try{
        await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connected to MongoDB succesfully....");
    }
    catch(err){
        console.log("Something Wrong to Connecting to Database..........");
    }
}

export default MongoDbConnection;
