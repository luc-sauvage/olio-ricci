import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Shop from "./shop";
import Home from "./home";
import Cart from "./cart";
import { useSelector } from "react-redux";

export default function App() {
    const productsCart = useSelector(state => state.productCart);
    const {cart} = productsCart;
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
                        <Link to="/register">Registrati</Link>
                    </div>
                </header>
                <main>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/shop" component={Shop}></Route>
                    <Route path="/cart" component={Cart}></Route>
                </main>
                <footer className="row centered">
                    All rights reserved - Azienda Agricola Alessandro Ricci -
                    via della Variante 2, 05020 Montecchio
                </footer>
            </div>
        </BrowserRouter>
    );
}
