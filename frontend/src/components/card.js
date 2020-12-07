import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../actions/cartActions";

export default function Card ({prodotto}) {

    const dispatch = useDispatch();
    let [quantita, setQuantita] = useState(1);

    const addToCartHandler = (prodotto, qty) => {
        
        dispatch(addProductToCart(prodotto, qty));
        /* dispatch(addProductToCart(prodotto, qty.value)); */
        /* setSelectedOption(null); */
    };

    return (
        <>
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
                                                    {/* <Select options={selectOptions} onChange={setSelectedOption} defaultValue={selectedOption}/> */}
                                                    <select id="qty"
                                                        onChange={(e) =>
                                                            setQuantita(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option class="1" value="1">1</option>
                                                        <option class="2" value="2">2</option>
                                                        <option class="3" value="3">3</option>
                                                        <option class="4" value="4">4</option>
                                                        <option class="5" value="5">5</option>
                                                        <option class="6" value="6">6</option>
                                                        <option class="7" value="7">7</option>
                                                        <option class="8" value="8">8</option>
                                                        <option class="9" value="9">9</option>
                                                        <option class="10" value="10">
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
        </>
    )
}