import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from './actions/cartActions';
import { setLastPageAction } from './actions/navActions';
import CheckOut from './components/checkout'

export default function Shipping(props) {

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const { firstName, lastName } = userInfo;

    const [shippingFirstName, setShippingFirstName] = useState("");
    const [shippingLastName, setShippingLastName] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingCAP, setShippingCAP] = useState("");

    const redirect = props.location.pathname;

    const addressData = JSON.parse(localStorage.getItem("shippingAddress"));

    useEffect(() => {
        dispatch(setLastPageAction(redirect));
        if (addressData && userInfo) {
            setShippingFirstName(addressData.shippingFirstName);
            setShippingLastName(addressData.shippingLastName);
            setShippingAddress(addressData.shippingAddress);
            setShippingCity(addressData.shippingCity);
            setShippingCAP(addressData.shippingCAP);
        } else {
            if (userInfo) {
                setShippingFirstName(firstName);
                setShippingLastName(lastName);
            } else {
                props.history.push("/login");
            }
        }
    }, []);

    

    function submitHandler(event) {
        event.preventDefault();
        console.log(
            "info before submit",
            shippingFirstName,
            shippingLastName,
            shippingAddress,
            shippingCity,
            shippingCAP
        );
        dispatch(
            saveShippingAddress({
                shippingFirstName,
                shippingLastName,
                shippingAddress,
                shippingCity,
                shippingCAP,
            })
        );
        props.history.push("/payment");
    }



    return (
        <div>
            <CheckOut step1></CheckOut>
            {shippingFirstName && <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Indirizzo di spedizione</h1>
                </div>
                <div>
                    <input
                        type="text"
                        id="first-name"
                        defaultValue={shippingFirstName ? shippingFirstName : firstName}
                        required
                        onChange={(e) => setShippingFirstName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="last-name"
                        defaultValue={shippingLastName ? shippingLastName : lastName}
                        required
                        onChange={(e) => setShippingLastName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="address"
                        placeholder="Inserisci indirizzo"
                        defaultValue={shippingAddress}
                        required
                        onChange={(e) => setShippingAddress(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="city"
                        placeholder="Inserisci comune"
                        defaultValue={shippingCity}
                        required
                        onChange={(e) => setShippingCity(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="CAP"
                        placeholder="Inserisci CAP"
                        defaultValue={shippingCAP}
                        required
                        onChange={(e) => setShippingCAP(e.target.value)}
                    ></input>
                </div>
                <div>
                    <button className="button" type="submit">
                        Inserisci dati pagamento
                    </button>
                </div>
            </form>}
        </div>
    )
}
