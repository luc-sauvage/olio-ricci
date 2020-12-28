import React from 'react';
import { Link } from "react-router-dom";

export default function CheckOut(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? "active" : ""}><Link className="checkout-nav-link" to="/shipping">Spedizione</Link></div>
            <div className={props.step2 ? "active" : ""}><Link className="checkout-nav-link" to="/payment">Pagamento</Link></div>
            <div className={props.step3 ? "active" : ""}><Link className="checkout-nav-link" to="/place-order">Ordina</Link></div>  
        </div>
    )
}


