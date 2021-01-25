import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getAllOrdersList } from '../actions/orderActions';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';

export default function OrderListAdmin(props) {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const isAdmin = userInfo.isAdmin;
    const userId = userInfo._id;

    const allOrdersList = useSelector(state => state.allOrdersList);
    const { loading, error, allUserOrders } = allOrdersList;

    useEffect(() => {

        if (userId && isAdmin) {
            dispatch(getAllOrdersList());
            } else if (userId && !isAdmin) {
                props.history.push("/");
            } else {
                props.history.push("/login");
            }
        
    }, [dispatch, userId, isAdmin, props.history]);


    return (
        <div>
            <h1>Ecco tutti gli ordini, {userInfo.firstName}</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                allUserOrders && <table className="table">
                    <thead>
                        <tr>
                            <th>CODICE ORDINE</th>
                            <th>CODICE CLIENTE</th>
                            <th>DATA</th>
                            <th>SUBTOTALE</th>
                            <th>COSTI SPEDIZIONE</th>
                            <th>TOTALE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUserOrders.map((order) => (
                            <tr key={order._id}>
                                <Link to={`/order/${order._id}`}>
                                    <td>{order._id}</td>
                                </Link>
                                <td>{order.user}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.subtotale}</td>
                                <td>{order.costiSpedizione}</td>
                                <td>{order.totale}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
