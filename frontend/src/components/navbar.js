import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

export default function Navbar() {

    const productsCart = useSelector((state) => state.productCart);
    const { cart } = productsCart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const [scroll, setScroll] = useState(false);

    function signoutHandler() {
        dispatch(logout());
    }

    const userNameRef = useRef();
    const arrowRef = useRef();
    const dropDownRef = useRef();

    function dropDown() {
        dropDownRef.current.classList.toggle("dropdown-off");
        arrowRef.current.classList.toggle("right-pointing");
        arrowRef.current.classList.toggle("down-pointing");
    }

    

    function changeNavBarColor() {
        if (window.scrollY >= 80) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    }

    window.addEventListener("scroll", changeNavBarColor);

    return (
        <div>
            <header className={scroll ? "navbar-container row centered colored" : "navbar-container row centered"}>
                    <nav className="navbar">
                    <div>
                        <a href="/">
                            <img
                                src={scroll ? "./images/logo_green.png" : "./images/logo.png"}
                                alt="olio ricci logo"
                            ></img>
                        </a>
                    </div>
                    <div>
                        <Link className={scroll ? "navbar-link alt-link" : "navbar-link"} to="/">
                            Home
                        </Link>
                        <Link className={scroll ? "navbar-link alt-link" : "navbar-link"} to="/shop">
                            Negozio
                        </Link>
                        <Link className={scroll ? "navbar-link alt-link" : "navbar-link"} to="/cart">
                            Carrello
                        </Link>
                        {cart.length > 0 && (
                            <span className="badge">{cart.length}</span>
                        )}
                        {userInfo && !userInfo.isAdmin ? (
                            <div ref={userNameRef} onClick={dropDown} className={scroll ? "dropdown alt-dropdown" : "dropdown"}>
                                <p>
                                    Ciao, {userInfo.firstName}{" "}
                                    <i
                                        ref={arrowRef} className="fa fa-caret-down right-pointing "
                                    ></i>{" "}
                                </p>
                                <ul
                                    ref={dropDownRef} className="dropdown-content dropdown-off"
                                >
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
                            <div ref={userNameRef} onClick={dropDown} className={scroll ? "dropdown alt-dropdown" : "dropdown"}>
                                <p>
                                    Ciao, {userInfo.firstName}{" "}
                                    <i ref={arrowRef} className="fa fa-caret-down right-pointing "></i>{" "}
                                </p>
                                <ul ref={dropDownRef} className="dropdown-content dropdown-off">
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
                                            to="/login"
                                            onClick={signoutHandler}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link className={scroll ? "navbar-link alt-link" : "navbar-link"} to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                    </nav>
                </header>
        </div>
    )
}
