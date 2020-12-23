import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registration } from "./actions/userActions";
import MessageBox from "./components/messagebox";

export default function Registration(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const { lastPage } = useSelector((state) => state.lastPage);

    const userRegister = useSelector((state) => state.userRegistration);
    const { userInfo, error } = userRegister;

    const dispatch = useDispatch();

    function submitHandler(event) {
        event.preventDefault();
        if (password !== confirmedPassword) {
            setPasswordError(true);
            console.log(passwordError)
        } else {
            dispatch(registration(firstName, lastName, email, password));
        }
    }

    useEffect(() => {
        console.log(lastPage);
        if (userInfo) {
            props.history.push(`${lastPage}`);
        }
    }, [userInfo, props.history, lastPage]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Log In</h1>
                </div>
                {(passwordError) && (
                    <div className="danger alert-danger">Le password non corrispondono, ricontrolla!</div>
                )}
                {(error) && (
                    <MessageBox variant="danger">{error}</MessageBox>
                )}
                <div>
                    <input
                        type="text"
                        id="first-name"
                        placeholder="Inserisci il tuo nome"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        id="last-name"
                        placeholder="Inserisci il tuo cognome"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>
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
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Conferma password"
                        required
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <button className="button" type="submit">
                        Registrati
                    </button>
                </div>
                <div>
                    <div className="form-text">
                        Sei già registrato?{" "}
                        <Link className="form-text-link" to="/login">
                            Esegui il log-in
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}