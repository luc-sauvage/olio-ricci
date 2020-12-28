import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [
            {
                nome: { type: String, required: true, unique: true },
                qty: { type: Number, required: true },
                foto: { type: String, required: true },
                prezzo: { type: Number, required: true },
            },
        ],
        shipping: {
            shippingFirstName: { type: String, required: true },
            shippingLastName: { type: String, required: true },
            shippingAddress: { type: String, required: true },
            shippingCity: { type: String, required: true },
            shippingCap: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        subtotalPrice: { type: Number, required: true },
        shippingPrice: { type: Number, rquired: true },
        totalPrice: { type: Number, rquired: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: date },
        isShipped: { type: Boolean, default: false },
        shippedAt: { type: date },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Ordine", orderSchema);

export default Order; 