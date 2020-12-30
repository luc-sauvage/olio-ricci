import React, { useEffect } from "react";
import LoadingBox from "../components/loadingbox.js";
import MessageBox from "../components/messagebox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.js";
import Card from "../components/card.js"
import { setLastPageAction } from "../actions/navActions.js";

export default function Shop(props) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, prodotti } = productList;

    const redirect = props.location.pathname;


    useEffect(() => {
        dispatch(listProducts());
        dispatch(setLastPageAction(redirect));
    }, [dispatch, redirect]);

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


