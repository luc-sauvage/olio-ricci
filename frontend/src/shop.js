import React, { useEffect, useState } from "react";
import LoadingBox from "./components/loadingbox.js";
import MessageBox from "./components/messagebox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./actions/productActions.js";
import { addProductToCart } from "./actions/cartActions.js";

export default function Shop() {
    const dispatch = useDispatch();
    let [quantita, setQuantita] = useState(1);
    const productList = useSelector((state) => state.productList);
    const { loading, error, prodotti } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    const addToCartHandler = (prodotto, qty) => {
        /* prodotto.quantità = Number(qty);
        console.log("prodotto, qty: ", prodotto); */
        dispatch(addProductToCart(prodotto, qty));
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
                                                <select id="qty"
                                                    onChange={(e) =>
                                                        setQuantita(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">
                                                        10
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                addToCartHandler(
                                                    prodotto,
                                                    quantita
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
