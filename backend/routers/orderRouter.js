import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
    "/",
    isAuth, 
    expressAsyncHandler(async (req, res) => {
        const { productCart, price } = req.body.order;
        const { paymentMethod, shippingAddress, cart } = productCart;
        const { subtotalPrice, shipmentCosts, totalPrice } = price;

        if (req.body.orderItems === 0) {
            res.status(400).send({ message: "Il carrello è vuoto" });
        } else {
            try {
            const order = new Order({
                user: req.user._id,
                ordine: cart,
                spedizione: shippingAddress,
                metodoPagamento: paymentMethod,
                subtotale: subtotalPrice,
                costiSpedizione: shipmentCosts,
                totale: totalPrice,
            });
            const createdOrder = await order.save();
            res.status(201).send({
                message: "Abbiamo preso in carico il suo ordine",
                order: createdOrder,
            });
        } catch (error) {
            res.send(error);
        } 
            
        }
    })
);

orderRouter.get("/history/:userId", expressAsyncHandler (async (req, res) => {
    const orders = await Order.find({user: req.params.userId});
    res.send(orders);
}))

orderRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            console.log("order", order)
            res.send(order);
        } else {
            res.status(404).send({ message: "order not found" });
        }
    })
);



export default orderRouter;