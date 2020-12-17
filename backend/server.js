import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect("mongodb://localhost/olio-ricci", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
} );

app.get("/api/prodotti", (req, res) => {
    console.log(data.prodotti);
    res.send(data.prodotti);
});

app.use("/api/users", userRouter);

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