import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true, unique: true },
        foto: { type: String, required: true },
        prezzo: { type: Number, required: true },
        disponibile: { type: String, required: true },
        descrizione: { type: String }
    },
    {
        timestamps: true,
    }
);

const Prodotto = mongoose.model("Prodotto", productSchema);

export default Prodotto; 