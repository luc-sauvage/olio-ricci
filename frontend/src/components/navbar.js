import React, { useEffect, useState } from "react";
import MobileNavbar from "./mobileNavbar";
import NavLinks from "./navlinks";

export default function Navbar() {


    const [scroll, setScroll] = useState(false);
    const [hamburger, setHamburger] = useState();
    const [click, setClick] = useState(false);




    function changeNavBarColor() {
        if (window.scrollY >= 80) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    }

    function handleHamburgerClick() {
        setClick(!click);
    }

    useEffect(() => {
        if (window.innerWidth > 1300) {
            setHamburger(false);
        } else {
            setHamburger(true);
        }
    }, []);

    window.addEventListener("scroll", changeNavBarColor);

    return (
        <div>
            {!click && <header
                className={
                    scroll
                        ? "navbar-container row centered colored"
                        : "navbar-container row centered"
                }
            >
                <nav className="navbar">
                    <div>
                        <a href="/">
                            <img
                                src={
                                    scroll
                                        ? "./images/logo_green.png"
                                        : "./images/logo.png"
                                }
                                alt="olio ricci logo"
                            ></img>
                        </a>
                    </div>
                    {!hamburger && <NavLinks></NavLinks>}
                    {hamburger && (
                        <div onClick={handleHamburgerClick}>
                            {!click && (
                                <i
                                    class={
                                        scroll
                                            ? "fa fa-bars bars-green fa-2x"
                                            : "fa fa-bars fa-2x"
                                    }
                                ></i>
                            )}
                            {click && (
                                <i
                                class={
                                    scroll
                                        ? "fa fa-times bars-green fa-2x"
                                        : "fa fa-times fa-2x"
                                }
                            ></i>
                            )}
                        
                        </div>
                    )}
                </nav>
            </header>}
            {click && <MobileNavbar></MobileNavbar>}
        </div>
    );
}
