//create the logic to generate and send OTP via SMS. We’ll use the Twilio API for this


const express=require("express");
const router=express.Router();
//creating a new router object. In Express.js, a router is a middleware that allows you to group your route handlers and middleware for modular and mountable route handling.
const User=require("../models/User");
const {sendOTP}=require("../utils/otp");
const {randomInt}=require("crypto");
//This line is importing the randomInt function from Nodejs built-in crypto module. This function generates a random integer, which could be used for a variety of purposes, such as generating a random OTP.


//sending the otp

router.post("/sendotp",async(req,res)=>{
    const {phone}=req.body;

    // Generate a 6-digit OTP
    //const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp=randomInt(100000,999999);

    try{
        // Save OTP and its expiration time in the database
        const user=await User.findOneAndUpdate(
            {phone},
            {otp,otpExpiration:Date.now()+600000}, // OTP expires in 10 minutes
            {upsert:true,new:true}
        );

        //sending otp via sms

        await sendOTP(phone,otp);
        res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        });
    }catch(error){
        console.error("Error sending OTP : ", error);
        res.status(500).json({
            success:false,
            message:"Failed to send OTP"
        });
    };
});



//verifying the otp

router.post("/verifyotp",async(req,res)=>{
    const {phone,otp}=req.body;

    try{

            // Find user by phone number and OTP
        const user=await User.findOne({phone,otp});

        if(!user || user.otpExpiration<Date.now())
        {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP or it has been expired."
            });
        }
        // Clear OTP and expiration time after successful verification
        user.otp=undefined;
        user.otpExpiration=undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message:"Otp verified successfully"
        });
    }catch(error){
        console.error("Error Verifying Otp : ", error);
        res.status(500).json({
            success: false,
            message: "failed to verify otp"
        });
    };
});

module.exports=router;

//This code defines two endpoints: /sendotp to generate and send OTP, and /verifyotp to verify the OTP entered by the user

