const express=require("express");
const bodyParser=require('body-parser');
const {connect}=require("./db");
// Import the connect function from db.js
const authRoutes=require("./routes/auth");


const app=express();
const PORT=process.env.PORT || 4000;

app.use(bodyParser.json()); 
// Middleware for parsing JSON bodies

app.use("/auth",authRoutes); 
// Mounts auth routes at /auth

// Connect to the database before starting the server

connect().then(()=>{
    //start server
    app.listen(PORT,()=>{
        console.log(`Server sunning on port ${PORT}`);
    });
})
.catch(err=>{
    console.error("Error Connecting to database:", error);
});
