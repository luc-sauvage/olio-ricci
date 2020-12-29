import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems === 0) {
            res.status(400).send({ message: "Il carrello è vuoto" });
        } else {
            const order = new Order({
                user: req.body.userId,
                orderItems: req.body.orderItems,
                shipping: req.body.addressData,
                paymentMethod: req.body.paymentMethod,
                subtotalPrice: req.body.subtotalPrice,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
            });
            const createdOrder = await order.save();
            res.status(201).send({message: "Abbiamo preso in carico il suo ordine", order: createdOrder});
        }
    })
);

export default orderRouter;