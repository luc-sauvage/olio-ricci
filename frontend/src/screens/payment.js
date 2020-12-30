import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions.js';
import { setLastPageAction } from '../actions/navActions.js';
import CheckOut from '../components/checkout'

export default function Payment(props) {

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const dispatch = useDispatch();

    const redirect = props.location.pathname;

    function submitHandler(e) {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push("/place-order");
    }

    const addressData = JSON.parse(localStorage.getItem("shippingAddress"));

    useEffect(() => {
        if (addressData && userInfo) {
            dispatch(setLastPageAction(redirect));
        } else {
            if (userInfo) {
                props.history.push("/shipping");
            } else {
                props.history.push("/login");
            }
        }
    }, []);

    return (
        <div>
            <CheckOut step1 step2></CheckOut>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Metodo di pagamento</h1>
                </div>
                <div>
                    <div>
                        <input
                            className="radio"
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            className="radio"
                            type="radio"
                            id="stripe"
                            value="Stripe"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className="button" type="submit">
                        Vai alla conferma dell'ordine
                    </button>
                </div>
            </form>
        </div>
    );
}
