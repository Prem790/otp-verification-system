//a user model to store user information

const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:String,
    phone:String,
    otp:String,
    otpExpiration:Date,
});

module.exports=mongoose.model("User",userSchema);
//we are creating a new instance of the User Model using the "User" keyword and passing in our schema as an argument//export the User model
//we are creating a new instance of the User Model and passing it the schema we defined above
//This schema defines the structure of our user documents in MongoDB, including fields for username, phone number, OTP, and OTP expiration time.

