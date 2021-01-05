import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import paymentRouter from "./routers/paymentRouter.js";

<<<<<<< HEAD

=======
import Stripe from 'stripe';

const stripe = new Stripe('pk_test_51I6FuaBAowNX0CrKTv5CPsbyKpFuRwi3RJnrfNiBhjPhwxVANEoxNTPosoTfSTI6Fo5BDWErnZ7FvdE3ZnJNGoei00WDoA4BLh');
>>>>>>> 0fc2654c34bc7e42288f8b1daa8025f95e31d20f

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/olio-ricci", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
} );


app.use("/api/users", userRouter);
app.use("/api/prodotti", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/config", paymentRouter);
/* app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.post("api/config/stripe", async (req, res) => {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur"
      });
      res.send({
        clientSecret: paymentIntent.client_secret
      });
}); */
app.get("/", (req, res) => {
    console.log("test");
    res.send("server is ready");
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});