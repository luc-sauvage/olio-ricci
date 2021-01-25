import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderListAdmin() {

    const orders = useSelector(state => state.orders)


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
    )
}
