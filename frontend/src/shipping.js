import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from './actions/cartActions';
import { setLastPageAction } from './actions/navActions';
import CheckOut from './components/checkout'

export default function Shipping(props) {

    const dispatch = useDispatch();

    const userData = useSelector(state => state.userLogin);
    const { userInfo } = userData;
    const { firstName, lastName } = userInfo;

    /* const userAddress = useSelector((state) => state.productCart);
    console.log("userAddress", userAddress);
    const { existingShippingAddress } = userAddress;
    const { address, city, cap } = existingShippingAddress; */

    const [shippingFirstName, setShippingFirstName] = useState("");
    const [shippingLastName, setShippingLastName] = useState("");
    const [shippingAddress, setShippingAddress] = useState(
        "Inserisci indirizzo"
    );
    const [shippingCity, setShippingCity] = useState("Inserisci comune");
    const [shippingCAP, setShippingCAP] = useState("Inserisci CAP");

    const redirect = props.location.pathname;


    useEffect(() => {

        if (userInfo) {
            setShippingFirstName(firstName);
            setShippingLastName(lastName);
            /* setShippingAddress(address);
            setShippingCity(city);
            setShippingCAP(cap); */
            dispatch(setLastPageAction(redirect));
        } else {
            props.history.push("/login");
        }

    }, []);

    

    function submitHandler (event) {
        event.preventDefault();
        dispatch(saveShippingAddress({shippingFirstName, shippingLastName, shippingAddress, shippingCity, shippingCAP}));
        props.history.push("/payment");
    }



    return (
        <div>
            <CheckOut step1></CheckOut>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Indirizzo di spedizione</h1>
                </div>
                <div>
                    <input
                        type="text"
                        id="first-name"
                        defaultValue={firstName}
                        required
                        onChange={(e) => setShippingFirstName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="last-name"
                        defaultValue={lastName}
                        required
                        onChange={(e) => setShippingLastName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="address"
                        placeholder={shippingAddress}
                        required
                        onChange={(e) => setShippingAddress(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="city"
                        placeholder={shippingCity}
                        required
                        onChange={(e) => setShippingCity(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="CAP"
                        placeholder={shippingCAP}
                        required
                        onChange={(e) => setShippingCAP(e.target.value)}
                    ></input>
                </div>
                <div>
                    <button className="button" type="submit">
                        Inserisci dati pagamento
                    </button>
                </div>
            </form>
        </div>
    )
}
