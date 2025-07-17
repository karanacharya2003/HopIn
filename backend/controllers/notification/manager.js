import twilio from "twilio/lib/rest/Twilio.js";

const accountSid = process.env.SID;  
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

export async function manager(to, message) {
  try {
    const smsResponse = await client.messages.create({
      from: process.env.PHONE_NUM, 
      to: to, 
      body: message,
    });
    console.log(`Message Sent to ${to} successfully!`, smsResponse);

  } 
  catch (error) {
    console.error('Error sending SMS:', error);
  }
}

