import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLastPageAction } from "../actions/navActions.js";
import { getOrderDetails } from "../actions/orderActions.js";
import LoadingBox from "../components/loadingbox";
import MessageBox from "../components/messagebox";

export default function Order(props) {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;

    const redirect = props.location.pathname;

    const orderId = props.match.params.id;
    console.log(orderId);

    const orderDetails = useSelector((state) => state.orderDetails);
    // console.log("orderDetails", orderDetails);
    const { order, loading, error } = orderDetails;
    console.log("order", order);
    // console.log("order.ordine array", order.ordine);

    /* let totalQty = 0;
    order.ordine.map((singleProduct) => (totalQty += singleProduct.qty)); */

    useEffect(() => {
        if (userInfo) {
            dispatch(setLastPageAction(redirect));
            dispatch(getOrderDetails(orderId));
        } else {
            props.history.push("/login");
        }
    }, [props.history, orderId, dispatch]);

    /* return (
        <h1>this is order</h1>
    ) */

   return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <>
            {order && Object.keys(order).length && (
                <div>
                    <h1>Order {order._id}</h1>
                    <div className="row">
                        <div className="column top">
                            <div className="card card-body">
                                <h2>L'ordine contiene</h2>
                                <ul>
                                    {order &&
                                        order.ordine.map((articolo) => (
                                            <li>
                                                <img
                                                    alt={articolo.product.nome}
                                                    src={articolo.product.foto}
                                                ></img>
                                                <p>
                                                    Articolo:{" "}
                                                    {articolo.product.nome}
                                                </p>{" "}
                                                <p>Quantità: {articolo.qty}</p>
                                                <p>
                                                    Prezzo:{" "}
                                                    {articolo.product.prezzo}
                                                </p>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="card card-body">
                                <h2>Dati per la spedizione</h2>
                                <ul>
                                    <li>
                                        Nome:{" "}
                                        {order.spedizione.shippingFirstName}
                                    </li>
                                    <li>
                                        Cognome:{" "}
                                        {order.spedizione.shippingLastName}
                                    </li>
                                    <li>
                                        Indirizzo:{" "}
                                        {order.spedizione.shippingAddress}
                                    </li>
                                    <li>
                                        Città: {order.spedizione.shippingCity}
                                    </li>
                                    <li>CAP: {order.spedizione.shippingCAP}</li>
                                </ul>
                            </div>
                            <div className="card card-body">
                                <h2>Metodo di pagamento</h2>
                                <p>{order.metodoPagamento}</p>
                            </div>
                        </div>
                        <div className="column top">
                            <li>
                                Subtotale({} articoli): €{" "}
                                {order.subtotale}
                            </li>
                            <li>Costi spedizione: € {order.costiSpedizione}</li>
                            <li>Totale: € {order.totale}</li>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 