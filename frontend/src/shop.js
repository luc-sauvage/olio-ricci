import React, { useEffect } from "react";
import LoadingBox from "./components/loadingbox.js";
import MessageBox from "./components/messagebox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./actions/productActions.js";
import { addProductToCart } from "./actions/cartActions.js";
import Select from "react-select";
import Card from "./components/card.js"

export default function Shop() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, prodotti } = productList;


    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="row centered">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                prodotti.map((prodotto) => (
                    <Card key={prodotto._id} prodotto={prodotto}></Card>
                ))
            )}
        </div>
    );
}
