import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {

        const { userId, productCart, price } = req.body.order;
        const { paymentMethod, shippingAddress, cart } = productCart;
        const { subtotalPrice, shipmentCosts, totalPrice } = price;

        if (req.body.orderItems === 0) {
            res.status(400).send({ message: "Il carrello è vuoto" });
        } else {
            const order = new Order({
                user: userId,
                ordine: cart,
                spedizione: shippingAddress,
                metodoPagamento: paymentMethod,
                subtotale: subtotalPrice,
                costiSpedizione: shipmentCosts,
                totale: totalPrice,
            });
            const createdOrder = await order.save();
            res.status(201).send({message: "Abbiamo preso in carico il suo ordine", order: createdOrder});
        }
    })
);

export default orderRouter;