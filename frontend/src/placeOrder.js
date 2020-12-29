import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLastPageAction } from "./actions/navActions";
import { createOrder } from "./actions/orderActions";
import CheckOut from "./components/checkout";
import LoadingBox from "./components/loadingbox";
import MessageBox from "./components/messagebox";
import { ORDER_CREATE_RESET } from "./constants/orderConstants";

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

    const productCart = useSelector(state => state.productCart);
    const cart = JSON.parse(localStorage.getItem("cart"));

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData; 
    const userId = userInfo._id;

    

    const redirect = props.location.pathname;

    const createdOrder = useSelector(state => state.createdOrder); 
    const {loading, success, error, order} = createdOrder; 

    const subtotalPrice = cart.reduce((a, c) => a + c.product.prezzo * c.qty, 0);
    const totalQuantity = cart.reduce((a, c) => a + c.qty, 0);
    const shipmentCosts = totalQuantity > 10 ? 0 : (totalQuantity * 2);
    const totalPrice = subtotalPrice + shipmentCosts; 
    const price = {subtotalPrice, shipmentCosts, totalPrice}; 

    const orderObject = {userId, productCart, price};

    function placeOrderHandler () {
        dispatch(createOrder({ order: orderObject}));
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
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [success, props.history, order, dispatch]);

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
                                        {totalPrice}
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
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
