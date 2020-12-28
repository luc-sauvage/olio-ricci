import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../actions/cartActions";

export default function Card ({prodotto}) {

    const dispatch = useDispatch();
    let [quantita, setQuantita] = useState(1);

    const addToCartHandler = (prodotto, qty) => {
        
        dispatch(addProductToCart(prodotto, qty));
    };

    return (
        <>
            <div key={prodotto._id} className="card">
                <img
                    className="prod-image"
                    src={prodotto.foto}
                    alt={`olio ricci qualità ${prodotto.nome}`}
                ></img>
                <div className="card-body">
                    <h2>
                            {prodotto.nome}
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
                                        <select
                                            id="qty"
                                            onChange={(e) =>
                                                setQuantita(e.target.value)
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
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        addToCartHandler(prodotto, quantita)
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
        </>
    );
}