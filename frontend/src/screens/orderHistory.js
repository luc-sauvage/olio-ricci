import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getOrderList } from '../actions/orderActions';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';

export default function OrderHistory(props) {

    const ordersList = useSelector((state) => state.ordersList);
    const { loading, error, orders } = ordersList;

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const userId = userInfo._id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
        dispatch(getOrderList());
        } else {
            props.history.push("/login");
        }
    }, [dispatch])

    return (
        <div>
            <h1>Ecco i tuoi ordini, {userInfo.firstName}</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                orders && <table className="table">
                    <thead>
                        <tr>
                            <th>CODICE ORDINE</th>
                            <th>DATA</th>
                            <th>SUBTOTALE</th>
                            <th>COSTI SPEDIZIONE</th>
                            <th>TOTALE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <Link to={`/order/${order._id}`}>
                                    <td>{order._id}</td>
                                </Link>
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
