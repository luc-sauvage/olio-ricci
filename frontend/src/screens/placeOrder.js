import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLastPageAction } from "../actions/navActions.js";
import { createOrder } from "../actions/orderActions.js";
import CheckOut from "../components/checkout";
import LoadingBox from "../components/loadingbox";
import MessageBox from "../components/messagebox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


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

    const productCart = useSelector((state) => state.productCart);
    const cart = JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const userId = userInfo._id;

    const redirect = props.location.pathname;

    const createdOrder = useSelector((state) => state.createdOrder);
    const { loading, success, error, order } = createdOrder;

    const subtotalPrice = cart.reduce(
        (a, c) => a + c.product.prezzo * c.qty,
        0
    );
    const totalQuantity = cart.reduce((a, c) => a + c.qty, 0);
    const shipmentCosts = totalQuantity > 10 ? 0 : totalQuantity * 2;
    const totalPrice = subtotalPrice + shipmentCosts;
    const price = { subtotalPrice, shipmentCosts, totalPrice };

    const orderObject = { userId, productCart, price };

    const [loadingPaypal, setLoadingPaypal] = useState(false);
    const [paypalSdkReady, setPaypalSdkReady] = useState(false);
    
    const [loadingStripe, setLoadingStripe] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [stripeError, setStripeError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();


    function successPaymentHandler() {
        dispatch(createOrder({ order: orderObject }));
        setSucceeded(false);
    }

    const addPayPalScript = async () => {
        const { data } = await Axios.get("/api/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=EUR`;
        script.async = true;
        script.onload = () => setPaypalSdkReady(true);
        setLoadingPaypal(false);
        document.body.appendChild(script);
    };

    const createStripePayment = async () => {
        const { data } = await Axios.post("/api/config/stripe", {
            amount: totalPrice,
            email: userInfo.email,
        });
        console.log("data", data);
        setClientSecret(data.clientSecret);
        setLoadingStripe(false);
    };

    const handleStripeCardChange = async (event) => {    
        setDisabled(event.empty);
        setStripeError(event.error ? event.error.message : "");
      };

    const handleStripePayment = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });
        console.log("result", result);

        if (result.error) {
            setStripeError(`Payment failed ${result.error.message}`);
            setProcessing(false);
        } else {
            setStripeError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    useEffect(() => {
        if (addressData && userInfo && paymentMethod) {
            dispatch(setLastPageAction(redirect));

            if (paymentMethod === "PayPal") {
                setLoadingPaypal(true);
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setPaypalSdkReady(true);
                    setLoadingPaypal(false);
                }
            } else {
                setLoadingStripe(true);
                createStripePayment();
            }
        } else {
            if (userInfo && addressData) {
                props.history.push("/payment");
            } else if (userInfo) {
                props.history.push("/shipping");
            } else {
                props.history.push("/login");
            }
        }
        if (succeeded) {
            successPaymentHandler();
        }
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
        
    }, [success, succeeded, props.history, order, dispatch]);

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
                                    <h2>Totale: € {totalPrice}</h2>
                                </li>
                                <li>
                                    {loadingPaypal && <LoadingBox></LoadingBox>}
                                    {paypalSdkReady && (
                                        <PayPalButton
                                            amount={totalPrice}
                                            currency="EUR"
                                            onSuccess={successPaymentHandler}
                                        ></PayPalButton>
                                    )}
                                    {loadingStripe && <LoadingBox></LoadingBox>}
                                    {clientSecret && (
                                        <form
                                            id="payment-form"
                                            className="stripe-form"
                                        >
                                            <CardElement
                                                id="card-element"
                                                onChange={
                                                    handleStripeCardChange
                                                }
                                            ></CardElement>
                                            <button
                                                disabled={
                                                    processing ||
                                                    disabled ||
                                                    succeeded
                                                }
                                                id="submit"
                                                type="button"
                                                className="button block"
                                                onClick={handleStripePayment}
                                            >
                                                Paga con Stripe
                                            </button>
                                            {stripeError && (
                                                <div
                                                    className="card-error"
                                                    role="alert"
                                                >
                                                    {stripeError}
                                                </div>
                                            )}
                                            {processing && (
                                                <LoadingBox>
                                                    Inserimento ordine in
                                                    corso...
                                                </LoadingBox>
                                            )}
                                        </form>
                                    )}
                                </li>
                                {loading && (
                                    <LoadingBox>
                                        Inserimento ordine in corso...
                                    </LoadingBox>
                                )}
                                {error && (
                                    <MessageBox variant="danger">
                                        {error}
                                    </MessageBox>
                                )}
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
