import dotenv from "dotenv";
import { application } from "express";

dotenv.config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_ID
);
export const sendSmsToBuyer = (userName, productName, orderId, userPhone) => {
  console.log(userPhone)
  client.messages
    .create({
      body:
        "Mukiriya mwiza " +
        userName +
        " ibyo mwasabye " +
        productName +
        "byemejwe " +
        orderId ,
        
        // "refId" +
        // orderId,
      from: "+12543473164",
      to: userPhone,
    })
    .then((message) => console.log(message.sid));
};

export const sendSmsToSeller = (clientName,clientPhone, productName,productQuantity,sellerPhone) => {
  client.messages
    .create({
      body:
        "Client " +
        clientName +
        " ( " +
        clientPhone +
        " ) ordered " +
        productQuantity +
        " kg of " +
        productName,
      from: "+12543473164",
      to: sellerPhone,
    })
    .then((message) => console.log(message.sid));
};

//client Liliane (+787878787878) ordered 25 Kg of rice.
