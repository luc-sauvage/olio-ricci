import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/", isAuth, isAdmin, expressAsyncHandler (async(req, res) => {
    const ordini = await Order.find();
    res.send(ordini); 
}))

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

orderRouter.get(
    "/history/", isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);

orderRouter.get(
    "/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: "order not found" });
        }
    })
);

export default orderRouter;
