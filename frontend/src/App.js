import React, { useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Shop from "./shop";
import Home from "./home";
import Cart from "./cart";
import { useDispatch, useSelector } from "react-redux";
import LogIn from "./login";
import { logout } from "./actions/userActions";

export default function App() {
    const productsCart = useSelector(state => state.productCart);
    const { cart } = productsCart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    function signoutHandler() {
        console.log("signoutHandler has fired");
        dispatch(logout());
    }

    useEffect(() => {
        if (userInfo) {
            let userName = document.querySelector(".dropdown");
            let arrow = document.querySelector(".fa-caret-down");
            let dropdown = document.querySelector(".dropdown-content");
            userName.addEventListener("click", function () {
                dropdown.classList.toggle("dropdown-off");
                arrow.classList.toggle("right");
                arrow.classList.toggle("down");
            });
        }
    }, [userInfo]);

    return (
        <BrowserRouter>
            <div className="grid-template">
                <header className="row">
                    <div>
                        <a href="/">
                            <img
                                src="./images/logo.png"
                                alt="olio ricci logo"
                            ></img>
                        </a>
                    </div>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/shop">Negozio</Link>
                        <Link to="/cart">Carrello</Link>
                        {cart.length > 0 && (
                            <span className="badge">{cart.length}</span>
                        )}
                        {userInfo ? (
                            <div className="dropdown">
                                <p>
                                    Ciao, {userInfo.firstName}{" "}
                                    <i className="fa fa-caret-down right "></i>{" "}
                                </p>
                                <ul className="dropdown-content dropdown-off">
                                    <Link to="/login" onClick={signoutHandler}>Logout</Link>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </div>
                </header>
                <main>
                    <Route path="/shop" component={Shop}></Route>
                    <Route path="/cart" component={Cart}></Route>
                    <Route path="/login" component={LogIn}></Route>
                    <Route exact path="/" component={Home}></Route>
                </main>
                <footer className="row centered">
                    All rights reserved - Azienda Agricola Alessandro Ricci -
                    via della Variante 2, 05020 Montecchio
                </footer>
            </div>
        </BrowserRouter>
    );
}
