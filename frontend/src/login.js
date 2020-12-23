import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./actions/userActions";
import MessageBox from "./components/messagebox";

export default function LogIn(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {lastPage} = useSelector((state) => state.lastPage);

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo, error} = userLogin;
   

    const dispatch = useDispatch();

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(email, password));
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
                {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                    <button className="button" type="submit">
                        Entra
                    </button>
                </div>
                <div>
                    <div className="form-text">
                        Non sei ancora registrato?{" "}
                        <Link className="form-text-link" to="/registration">
                            Crea un account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}