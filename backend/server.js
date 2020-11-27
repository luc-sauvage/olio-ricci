import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/prodotti", (req, res) => {
    console.log(data.prodotti);
    res.send(data.prodotti);
});

app.get("/", (req, res) => {
    console.log("test");
    res.send("server is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});