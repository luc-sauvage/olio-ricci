import express from "express";



import Stripe from 'stripe';

import dotenv from "dotenv";

dotenv.config();

const paymentRouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_CLIENT_ID);



paymentRouter.get("/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});


paymentRouter.post("/stripe", async (req, res) => {
  try {
    const { amount, email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "eur",
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("stripe error", error);
  }
});

export default paymentRouter; 