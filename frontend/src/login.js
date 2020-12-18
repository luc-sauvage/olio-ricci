import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./actions/userActions";

export default function LogIn(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    const dispatch = useDispatch();

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(email, password));
    } 

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Log In</h1>
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="Inserisci e-mail"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder="Inserisci password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <button className="button" type="submit">Entra</button>
                </div>
                <div>
                    <div className="form-text">
                        Non sei ancora registrato?{" "} 
                        <Link className="form-text-link" to="/register">Crea un account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}