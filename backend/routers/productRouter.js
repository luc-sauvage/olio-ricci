import express from "express";
import expressAsyncHandler from "express-async-handler";
import Prodotto from "../models/productModel.js";
import { isAuth } from "../utils.js";

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
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const prodotto = new Prodotto({
            nome: req.body.name,
            foto:
                "/images/olio_blend.png" /* this is static, since i still did not decide what service to use for storing pics */,
            prezzo: req.body.price,
            disponibile: req.body.availability,
            descrizione: req.body.description,
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
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const prodotto = await Prodotto.findById(req.body.id);
        if (prodotto) {
            prodotto.nome = req.body.name || prodotto.nome;
            /* prodotto.foto = ... need to be completed */
            prodotto.descrizione = req.body.description || prodotto.descrizione;
            prodotto.prezzo = req.body.price || prodotto.prezzo;
            prodotto.disponibile =
                req.body.availability || prodotto.disponibile;
        }
        const updatedProdotto = await prodotto.save();
        res.send({
            _id: updatedProdotto._id,
            nome: updatedProdotto.nome,
            /* foto: updatedProdotto.foto,  */
            descrizione: updatedProdotto.descrizione,
            prezzo: updatedProdotto.prezzo,
            descrizione: updatedProdotto.descrizione,
        });
    })
);

productRouter.delete(
    "/rimuovi/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const prodotto = await Prodotto.findById(req.params.id);
        const deletedProdotto = await prodotto.deleteOne();
        res.send({
            message: "Prodotto eliminato con successo!",
            product: deletedProdotto,
        });
    })
);

export default productRouter;