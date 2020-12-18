import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submitHandler (event) {
        event.preventDefault();

        // sign in action


    }

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