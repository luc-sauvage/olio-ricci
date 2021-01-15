import express from "express";
import expressAsyncHandler from "express-async-handler";
import Prodotto from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", expressAsyncHandler(async (req, res) => {
    const prodotti = await Prodotto.find({});
    res.send(prodotti);
}));

productRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        const createdProducts = await Prodotto.insertMany(data.prodotti);
        res.send({ prodotti: createdProducts });
    })
);

productRouter.post(
    "/crea",
    expressAsyncHandler(async (req, res) => {
        const prodotto = new Prodotto({
            nome: req.body.name,
            foto: "/images/olio_blend.png", /* this is static, since i still did not decide what service to use for storing pics */
            prezzo: req.body.price,
            disponibile: req.body.availability,
            descrizione: req.body.description
        });
        const createdProduct = await prodotto.save();
        res.send({
            message: "Nuovo prodotto creato con successo!",
            product: createdProduct,
        });
    })
);

productRouter.put(
    "/modifica",
    expressAsyncHandler(async (req, res) => {
        const prodotto = await Prodotto.findById(req.body.productId);
    })
);

export default productRouter;