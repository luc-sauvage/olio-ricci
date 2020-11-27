import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Shop() {
    const [prodotti, setProdotti] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/prodotti");
            setProdotti(data);
        }
        fetchData();
    }, []);

    return (
        <div className="row centered">
            {prodotti.map((prodotto) => (
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
                                <div className="disponibile">
                                    {prodotto.disponibile}
                                </div>
                            ) : (
                                <div className="esaurito">
                                    {prodotto.disponibile}
                                </div>
                            )}
                        </div>
                        <div className="row-card">
                            <div>Quantità</div>
                            <input type></input>
                        </div>
                        <button className="button block">
                            Aggiungi al carrello
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
