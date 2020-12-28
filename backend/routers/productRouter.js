import express from "express";
import expressAsyncHandler from "express-async-handler";
import Prodotto from "../models/productModel.js";
import data from "../data.js";



const productRouter = express.Router();

productRouter.get("/", expressAsyncHandler(async (req, res) => {
    const prodotti = await Prodotto.find({});
    res.send(prodotti);
}));

productRouter.get("/seed", expressAsyncHandler(async (req, res) => {
    /* await Prodotto.deleteMany({}); */
    const createdProducts = await Prodotto.insertMany(data.prodotti);
    res.send({prodotti: createdProducts}); 
}));


export default productRouter;