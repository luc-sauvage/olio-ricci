import React from 'react';
import { useSelector } from "react-redux";
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';

export default function orderHistory() {

    const ordersList = useSelector((state) => state.ordersList);
    const { loading, error, orders } = ordersList;


    return (
        <div>
            <h1>Order History</h1>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox>{error}</MessageBox> : 
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATA</th>
                            <th>TOTALE</th>
                        </tr>
                    </thead>
                </table>
            
            }
        </div>
    )
}
