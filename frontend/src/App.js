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

export default function App() {

    const productsCart = useSelector(state => state.productCart);
    const { cart } = productsCart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    function signoutHandler() {
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
                        <Link className="navbar-link" to="/">Home</Link>
                        <Link className="navbar-link" to="/shop">Negozio</Link>
                        <Link className="navbar-link" to="/cart">Carrello</Link>
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
                                    <Link className="navbar-link" to="/login" onClick={signoutHandler}>Logout</Link>
                                </ul>
                            </div>
                        ) : (
                            <Link className="navbar-link" to="/login">Login</Link>
                        )}
                    </div>
                </header>
                <main>
                    <Route exact path="/shop" component={Shop}></Route>
                    <Route exact path="/cart" component={Cart}></Route>
                    <Route exact path="/shipping" component={Shipping}></Route>
                    <Route exact path="/payment" component={Payment}></Route>
                    <Route exact path="/place-order" component={PlaceOrder}></Route>
                    <Route exact path="/login" component={LogIn}></Route>
                    <Route exact path="/registration" component={Registration}></Route>
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
