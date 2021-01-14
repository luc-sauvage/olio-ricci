import React, { useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Shop from "./screens/shop";
import Home from "./screens/home";
import Cart from "./screens/cart";
import { useDispatch, useSelector } from "react-redux";
import LogIn from "./screens/login";
import { logout } from "./actions/userActions";
import Registration from "./screens/registration";
import Shipping from "./screens/shipping";
import Payment from "./screens/payment";
import PlaceOrder from "./screens/placeOrder";
import Order from "./screens/order";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderHistory from "./screens/orderHistory";
import Profile from "./screens/profile";
const promise = loadStripe(
    "pk_test_51I6FuaBAowNX0CrKTv5CPsbyKpFuRwi3RJnrfNiBhjPhwxVANEoxNTPosoTfSTI6Fo5BDWErnZ7FvdE3ZnJNGoei00WDoA4BLh"
);

export default function App() {
    const productsCart = useSelector((state) => state.productCart);
    const { cart } = productsCart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading } = userLogin;

    const dispatch = useDispatch();

    function signoutHandler() {
        dispatch(logout());
    }

    /* const userName = document.querySelector(".dropdown");
    const arrow = document.querySelector(".fa-caret-down");
    const dropdown = document.querySelector(".dropdown-content"); */

    /* function dropDown() {
        let userName = document.querySelector(".dropdown");
        let arrow = document.querySelector(".fa-caret-down");
        let dropdown = document.querySelector(".dropdown-content");
        userName.addEventListener("click", function () {
            console.log("click");
            dropdown.classList.toggle("dropdown-off");
            arrow.classList.toggle("right");
            arrow.classList.toggle("down");
        });
    } */

    useEffect(() => {
        if (userInfo) {
            console.log("user info has changed")
            const userName = document.querySelector(".dropdown");
            const arrow = document.querySelector(".fa-caret-down");
            const dropdown = document.querySelector(".dropdown-content");
            userName.addEventListener("click", function () {
                console.log("click");
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
                        <Link className="navbar-link" to="/">
                            Home
                        </Link>
                        <Link className="navbar-link" to="/shop">
                            Negozio
                        </Link>
                        <Link className="navbar-link" to="/cart">
                            Carrello
                        </Link>
                        {cart.length > 0 && (
                            <span className="badge">{cart.length}</span>
                        )}
                        {userInfo && !userInfo.isAdmin ? (
                            <div
                                /* onClick={() => {
                                    let userName = document.querySelector(
                                        ".dropdown"
                                    );
                                    let arrow = document.querySelector(
                                        ".fa-caret-down"
                                    );
                                    let dropdown = document.querySelector(
                                        ".dropdown-content"
                                    );
                                    userName.addEventListener(
                                        "click",
                                        function () {
                                            console.log("click");
                                            dropdown.classList.toggle(
                                                "dropdown-off"
                                            );
                                            arrow.classList.toggle("right");
                                            arrow.classList.toggle("down");
                                        }
                                    );
                                }} */
                                className="dropdown"
                            >
                                <p>
                                    Ciao, {userInfo.firstName}{" "}
                                    <i className="fa fa-caret-down right "></i>{" "}
                                </p>
                                <ul className="dropdown-content dropdown-off">
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/user-profile"
                                        >
                                            Il tuo profilo
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/orderhistory"
                                        >
                                            I tuoi ordini
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/login"
                                            onClick={signoutHandler}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : userInfo && userInfo.isAdmin ? (
                            <div
                                className="dropdown"
                            >
                                <p>
                                    Ciao, {userInfo.firstName}{" "}
                                    <i className="fa fa-caret-down right "></i>{" "}
                                </p>
                                <ul className="dropdown-content dropdown-off">
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/admin-dashboard"
                                        >
                                            Opzioni amministratore
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/admin-products"
                                        >
                                            Gestisti prodotti
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/admin-orders"
                                        >
                                            Lista ordini
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/admin-users"
                                        >
                                            Lista utenti
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-link"
                                            to="/login"
                                            onClick={signoutHandler}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link className="navbar-link" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </header>
                <main>
                    <Route exact path="/shop" component={Shop}></Route>
                    <Route exact path="/cart" component={Cart}></Route>
                    <Route exact path="/shipping" component={Shipping}></Route>
                    <Route exact path="/payment" component={Payment}></Route>
                    <Elements stripe={promise}>
                        <Route
                            exact
                            path="/place-order"
                            component={PlaceOrder}
                        ></Route>
                    </Elements>
                    <Route exact path="/order/:id" component={Order}></Route>
                    <Route
                        exact
                        path="/orderhistory"
                        component={OrderHistory}
                    ></Route>
                    <Route exact path="/login" component={LogIn}></Route>
                    <Route
                        exact
                        path="/registration"
                        component={Registration}
                    ></Route>
                    <Route
                        exact
                        path="/user-profile"
                        component={Profile}
                    ></Route>
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
