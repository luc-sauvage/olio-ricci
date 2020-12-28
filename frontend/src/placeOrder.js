import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
            <div className="column top">
                <ul>
                    <div>
                        <li>
                            <div className="card card-body">
                                <h2>Dati per la spedizione</h2>
                                <p>
                                    <strong>Nome:</strong> {shippingFirstName}
                                    <br />
                                    <strong>Cognome:</strong> {shippingLastName}
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
                                <h2>L'ordine contiene:</h2>
                                <ul>
                                    {cart.map((prodotto) => (
                                        <li key={prodotto.product._id}>
                                            <div className="row">
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
                                                <div className="min-30">
                                                    <p>
                                                        {prodotto.product.nome}
                                                    </p>
                                                </div>
                                                <div>
                                                    Quantità: {prodotto.qty}
                                                </div>
                                                <div>
                                                    € {prodotto.product.prezzo}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </div>
                    {cart.length > 0 && (
                        <div>
                            <div className="card card-body">
                                <li>
                                    <h2>
                                        Subtotale (
                                        {cart.reduce((a, c) => a + c.qty, 0)}{" "}
                                        articoli): €{" "}
                                        {cart.reduce(
                                            (a, c) =>
                                                a + c.product.prezzo * c.qty,
                                            0
                                        )}
                                    </h2>
                                </li>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}
