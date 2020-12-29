import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        ordine: [
            {
                product: {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Prodotto',
                        required: true,
                      },
                    nome: { type: String, required: true },
                    prezzo: { type: Number, required: true },
                    foto: { type: String },
                },
                qty: {
                    type: Number,
                    required: true,
                },
            },
        ],
        spedizione: {
            shippingFirstName: { type: String, required: true },
            shippingLastName: { type: String, required: true },
            shippingAddress: { type: String, required: true },
            shippingCity: { type: String, required: true },
            shippingCAP: { type: String, required: true },
        }, 
        metodoPagamento: {
            type: String,
            required: true,
        },
        subtotale: {
            type: Number,
            required: true,
        },
        costiSpedizione: {
            type: Number,
            required: true,
        },
        totale: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Ordine", orderSchema);

export default Order; 