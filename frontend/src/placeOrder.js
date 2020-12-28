import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLastPageAction } from "./actions/navActions";
import CheckOut from "./components/checkout";

export default function PlaceOrder(props) {
    const dispatch = useDispatch();

    const addressData = JSON.parse(localStorage.getItem("shippingAddress"));
    const {
        shippingFirstName,
        shippingLastName,
        shippingAddress,
        shippingCity,
        shippingCAP,
    } = addressData;

    const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

    const cart = JSON.parse(localStorage.getItem("cart"));

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;

    const redirect = props.location.pathname;

    const subtotalPrice = cart.reduce((a, c) => a + c.product.prezzo * c.qty, 0);
    const totalQuantity = cart.reduce((a, c) => a + c.qty, 0);
    const shipmentCosts = totalQuantity > 10 ? 0 : (totalQuantity * 2);

    function placeOrderHandler () {
        // order actions
    }


    useEffect(() => {
        if (addressData && userInfo && paymentMethod) {
            dispatch(setLastPageAction(redirect));
        } else {
            if (userInfo && addressData) {
                props.history.push("/payment");
            } else if (userInfo) {
                props.history.push("/shipping");
            } else {
                props.history.push("/login");
            }
        }
    }, []);

    return (
        <div>
            <CheckOut step1 step2 step3></CheckOut>
            <div className="row">
                <div className="column top">
                    <ul>
                        <div className="">
                            <li>
                                <div className="card card-body">
                                    <h2>Dati per la spedizione</h2>
                                    <p>
                                        <strong>Nome:</strong>{" "}
                                        {shippingFirstName}
                                        <br />
                                        <strong>Cognome:</strong>{" "}
                                        {shippingLastName}
                                        <br />
                                        <strong>Indirizzo:</strong>{" "}
                                        {shippingAddress}
                                        <br />
                                        <strong>Comune:</strong> {shippingCity}
                                        <br />
                                        <strong>CAP:</strong> {shippingCAP}
                                        <br />
                                    </p>
                                </div>
                            </li>
                        </div>
                        <div>
                            <li>
                                <div className="card card-body">
                                    <h2>Metodo di pagamento</h2>
                                    <p>
                                        <strong>{paymentMethod}</strong>
                                    </p>
                                </div>
                            </li>
                        </div>
                        <div>
                            <li>
                                <div className="card card-body">
                                    {cart.length === 0 && (
                                        <>
                                            <h2>Il carrello è vuoto</h2>
                                            <Link to="/shop">
                                                Torna al negozio
                                            </Link>
                                        </>
                                    )}
                                    {cart.length > 0 && (
                                        <>
                                            <h2>L'ordine contiene:</h2>

                                            {cart.map((prodotto) => (
                                                <div
                                                    className="row"
                                                    key={prodotto.product._id}
                                                >
                                                    <div>
                                                        <img
                                                            className="prod-image-small"
                                                            src={
                                                                prodotto.product
                                                                    .foto
                                                            }
                                                            alt={
                                                                prodotto.product
                                                                    .nome
                                                            }
                                                        ></img>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            {
                                                                prodotto.product
                                                                    .nome
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        Quantità: {prodotto.qty}
                                                    </div>
                                                    <div>
                                                        €{" "}
                                                        {
                                                            prodotto.product
                                                                .prezzo
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
                {cart.length > 0 && (
                    <div className="column top">
                        <ul>
                            <div className="card card-body">
                                <li>
                                    <h3>
                                        Subtotale ({totalQuantity} articoli): €{" "}
                                        {subtotalPrice}
                                    </h3>
                                    <h3>
                                        Spese di spedizione: € {shipmentCosts}
                                    </h3>
                                    <h2>
                                        Totale: €{" "}
                                        {subtotalPrice + shipmentCosts}
                                    </h2>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={placeOrderHandler}
                                        className="button block"
                                    >
                                        Effettua pagamento
                                    </button>
                                </li>
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
