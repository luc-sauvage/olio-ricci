import express from "express";

const paymentRouter = express.Router();


paymentRouter.get("/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});


paymentRouter.post("/stripe", async (req, res) => {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur"
      });
      res.send({
        clientSecret: paymentIntent.client_secret
      });
});

export default paymentRouter; 