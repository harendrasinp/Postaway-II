import server from "./index.js";
import MongoDbConnection from "./src/Database_Config/mongoose.connection.js";

server.listen(8000,(req,res)=>{
    MongoDbConnection();
    console.log("Server is running on port 8000...");
    res.send("Welcome to Node server...");
});
