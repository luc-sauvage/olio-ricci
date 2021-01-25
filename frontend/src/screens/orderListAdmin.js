import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getAllOrdersList, setDispatchedOrder } from '../actions/orderActions';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';

export default function OrderListAdmin(props) {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const isAdmin = userInfo.isAdmin;
    const userId = userInfo._id;

    const allOrdersList = useSelector((state) => state.allOrdersList);
    const { loading, error, allUserOrders } = allOrdersList;

    const dispatchOrder = useSelector((state) => state.dispatchOrder);
    const { dispatchedOrder } = dispatchOrder;

    function handleOrderDispatch(orderId) {
        console.log(orderId);
        dispatch(setDispatchedOrder(orderId));
    }

    useEffect(() => {
        if (userId && isAdmin) {
            dispatch(getAllOrdersList());
        } else if (userId && !isAdmin) {
            props.history.push("/");
        } else {
            props.history.push("/login");
        }
    }, [dispatch, userId, dispatchedOrder, isAdmin, props.history]);

    return (
        <div>
            <h1>Ecco tutti gli ordini, {userInfo.firstName}</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                allUserOrders && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>CODICE ORDINE</th>
                                <th>CODICE CLIENTE</th>
                                <th>NOME CLIENTE</th>
                                <th>DATA</th>
                                <th>SUBTOTALE</th>
                                <th>COSTI SPEDIZIONE</th>
                                <th>TOTALE</th>
                                <th>STATO SPEDIZIONE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...allUserOrders].reverse().map((order) => (
                                <tr key={order._id}>
                                    <Link to={`/order/${order._id}`}>
                                        <td>{order._id}</td>
                                    </Link>
                                    <td>{order.user}</td>
                                    <td>
                                        {order.spedizione.shippingFirstName}{" "}
                                        {order.spedizione.shippingLastName}
                                    </td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.subtotale}</td>
                                    <td>{order.costiSpedizione}</td>
                                    <td>{order.totale}</td>
                                    <td className="row">
                                        {!order.spedito && <button
                                            onClick={() =>
                                                handleOrderDispatch(order._id)
                                            }
                                            className="button"
                                        >
                                            Contrassegna come spedito
                                        </button>}
                                        {order.spedito && <span>Spedito! <i className="fa fa-check"></i></span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
}
