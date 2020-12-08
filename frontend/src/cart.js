import React from "react";
import { useSelector } from "react-redux";
import LoadingBox from "./components/loadingbox.js";
import MessageBox from "./components/messagebox.js";

export default function Cart() {
    const productsCart = useSelector((state) => state.productCart);
    console.log("cart", productsCart);
    const { loading, error, productsInCart } = productsCart;

    return (
        <div className="row centered">
            {/* {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <h1>Carrello</h1>
                    {productsInCart.length === 0 && (
                        <div variant="danger">Nessun prodotto nel carrello</div>
                    )}
                    {productsInCart &&
                        productsInCart.map((product) => (
                            <div key={product._id} className="card"></div>
                        ))}
                </>
            )} */}
        </div>
    );
}
