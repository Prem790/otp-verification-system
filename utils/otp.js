//creating  the logic to generate and send OTP via SMS. We’ll use the Twilio API for this

const twilio=require("twilio");

const dotenv=require("dotenv");

dotenv.config();

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;
const client=new twilio(accountSid,authToken);


async function sendOTP(phone,otp){
    try{
        const message=await client.messages.create({
            body:  `Your OTP is ${otp}`,
            from:process.env.TWILIO_PHONE_NUMBER,
            to:phone,
        });
        console.log(`OTP sent to ${phone}:${message.sid}`);
    }catch(error){
        console.error("Errorsending otp: ",error);
    }
}
module.exports={sendOTP};
