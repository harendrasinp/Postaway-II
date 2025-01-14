import server from "./index.js";
import MongoDbConnection from "./src/Database_Config/mongoose.connection.js";

server.listen(8000,()=>{
    MongoDbConnection();
    console.log("Server is running on port 8000...");
});
