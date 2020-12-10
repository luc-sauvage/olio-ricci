import React from "react";
import { useSelector } from "react-redux";
import LoadingBox from "./components/loadingbox.js";
import MessageBox from "./components/messagebox.js";

export default function Cart() {
    const productsCart = useSelector((state) => state.productCart);
    console.log("cart", productsCart);
    const { cart } = productsCart;

    return (
        <div className="row centered">
            <h1>Carrello</h1>
            {cart.length === 0 && (
                <div variant="danger">Nessun prodotto nel carrello</div>
            )}
            {cart &&
                cart.map((product) => (
                <div key={product.product._id} className="horizontal-card">
                    {product.product.nome}
                </div>
                ))}
        </div>
    );
}
