import React, { useEffect, useState } from "react";
import LoadingBox from "./components/loadingbox.js";
import MessageBox from "./components/messagebox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./actions/productActions.js";
import { addProductToCart } from "./actions/cartActions.js";
import Select from "react-select";

export default function Shop() {
    const dispatch = useDispatch();
    let [selectedOption, setSelectedOption] = useState(null);
    const productList = useSelector((state) => state.productList);
    const { loading, error, prodotti } = productList;

    const selectOptions = [
        {value: 1, label: 1},
        {value: 2, label: 2},
        {value: 3, label: 3},
        {value: 4, label: 4},
        {value: 5, label: 5},
        {value: 6, label: 6},
        {value: 7, label: 7},
        {value: 8, label: 8},
        {value: 9, label: 9},
        {value: 10, label: 10},
    ];

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const addToCartHandler = (prodotto, qty) => {
        console.log("informazioni prodotto", prodotto);
        console.log("informazioni quantità", qty.value);
        dispatch(addProductToCart(prodotto, qty.value));
        /* setSelectedOption(null); */
    };

    return (
        <div className="row centered">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                prodotti.map((prodotto) => (
                    <div key={prodotto._id} className="card">
                        <a href={`/prodotti/${prodotto._id}`}>
                            <img
                                className="prod-image"
                                src={prodotto.foto}
                                alt={`olio ricci qualità ${prodotto.nome}`}
                            ></img>
                        </a>
                        <div className="card-body">
                            <h2>
                                <a href={`/prodotti/${prodotto._id}`}>
                                    {prodotto.nome}
                                </a>
                            </h2>
                            <p className="prod-desc">{prodotto.descrizione}</p>
                            <div className="row-card">
                                <div>Prezzo</div>
                                <div>€ {prodotto.prezzo}</div>
                            </div>
                            <div className="row-card">
                                <div className="quantity">Disponibile</div>
                                {prodotto.disponibile === "si" ? (
                                    <>
                                        <div className="disponibile">
                                            {prodotto.disponibile}
                                        </div>
                                        <div className="row-card">
                                            <div>Quantità </div>
                                            <div>
                                                <Select options={selectOptions} onChange={setSelectedOption} defaultValue={selectedOption}/>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                addToCartHandler(
                                                    prodotto,
                                                    selectedOption
                                                )
                                            }
                                            className="button block"
                                        >
                                            Aggiungi al carrello
                                        </button>
                                    </>
                                ) : (
                                    <div className="esaurito">
                                        {prodotto.disponibile}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
