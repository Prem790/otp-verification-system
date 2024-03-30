/*
express:- for creating the web server
mongoose:-for interacting with mongoDb
twilio:-to send otp via sms
dotenv:-for managing the enviornment variables
body-parse:-middleware for parsing incoming request bodies
*/

const mongoose=require("mongoose");

function connect(){
    return new Promise((resolve,reject)=>{
        mongoose.connect(process.env.mongo_url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        const  db = mongoose.connection;
        db.on("error",error=>{
            console.error("MongoDb connection error",error);
            reject(error);
        });
        db.once('open',()=>{
            console.log("Connected to mongodb");
           resolve();
    });
});
}
module.exports={connect};