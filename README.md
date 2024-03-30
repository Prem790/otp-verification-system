# otp-verification-system

This project is a Node.js application that implements OTP (One-Time Password) verification using Twilio and Express. It consists of two main parts:

**OTP Generation**: An endpoint (/sendotp) is provided where a user can request an OTP. The server generates a 6-digit OTP using the crypto library and associates it with the user’s phone number. The OTP and its expiration time are stored in a MongoDB database using the Mongoose ODM. The OTP is then sent to the user’s phone number via SMS using the Twilio API.

**OTP Verification**: Another endpoint (/verifyotp) allows the user to verify the OTP. The server checks if the provided OTP matches the one stored in the database and if it hasn’t expired. If the verification is successful, the OTP and its expiration time are cleared from the database.
The server is built with Express and uses body-parser middleware to parse incoming JSON requests. The application is designed to be tested with Postman.

Please note that this is a backend project and does not include a frontend. The endpoints are designed to be used with an external client or service for testing or integration with a frontend.

This project demonstrates a practical implementation of OTP verification, which is a common requirement in many types of applications for authentication and security purposes. It provides a solid foundation for further development and customization according to specific needs.



**How to test the otp-verification-system on POSTMAN?**

1. Install Postman: If you haven’t already, download and install Postman from their official website.

2. Start Your Server: Make sure your server is running. You can usually do this by running a command like node server.js in your terminal, depending on how you’ve set up your project.

3. Create a New Request in Postman:
   ->Click on the ‘+’ button to create a new tab.
   ->Change the HTTP method to POST.
   ->Enter your endpoint URL. If you’re running the server locally, it will be something like http://localhost:3000/auth/sendotp for the OTP generation.

4. Set Up the Request Body:
   ->Click on the ‘Body’ tab below the URL field.
   ->Select ‘raw’ and then select ‘JSON’ from the dropdown menu.
   ->In the text field that appears, enter the JSON object for your request. For the /sendotp endpoint, it will look something like this:


{
  "phone": "YourPhoneNumber"
}


**Replace "YourPhoneNumber" with the phone number you’re testing.**


6. Send the Request: Click the ‘Send’ button. If everything is set up correctly, you  should receive a 200 OK response, and the OTP should be sent to the specified phone number.


7. Verify the OTP:

   ->Change the URL to the OTP verification endpoint, which should be http://localhost:3000/auth/verifyotp.
   ->Update the JSON in the body to include the OTP you received, like so:


{
  "phone": "YourPhoneNumber",
  "otp": "YourOTP"
}


**Replace "YourPhoneNumber" and "YourOTP" with the phone number and the OTP you received.**

8. Click ‘Send’ again. If the OTP is correct and hasn’t expired, you should receive a 200 OK response indicating successful verification.

**THANK YOU.**