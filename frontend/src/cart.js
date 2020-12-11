import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeCartQuantity } from "./actions/cartActions.js";
import MessageBox from "./components/messagebox.js";

export default function Cart(props) {
    const dispatch = useDispatch();
    const productsCart = useSelector((state) => state.productCart);
    console.log("cart", productsCart);
    const { cart } = productsCart;

    function removeFromCartHandler (id) {
        // azione per togli dal carrello 
    }

    function checkoutHandler () {
        props.history.push("/signin?redirect=shipping");
    }

    return (
        <div className="row top">
            <div className="col">
                {cart.length === 0 ? (
                    <MessageBox>
                        Nessun prodotto nel carrello.{" "}
                        <Link to="/shop">Torna al negozio</Link>
                    </MessageBox>
                ) : (
                    <ul>
                        {cart.map((prodotto) => (
                            <li key={prodotto.product._id}>
                                <div className="row">
                                    <div>
                                        <img
                                            className="prod-image-small"
                                            src={prodotto.product.foto}
                                            alt={prodotto.product.nome}
                                        ></img>
                                    </div>
                                    <div className="min-30">
                                        <p>{prodotto.product.nome}</p>
                                    </div>
                                    <select
                                        value={prodotto.qty}
                                        onChange={(e) =>
                                            dispatch(
                                                changeCartQuantity(
                                                    prodotto.product,
                                                    e.target.value
                                                )
                                            )
                                        }
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <div>€ {prodotto.product.prezzo}</div>
                                    <div>
                                        <button
                                            className="button"
                                            type="button"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    prodotto.product._id
                                                )
                                            }
                                        >
                                            Togli dal carrello
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {cart.length > 0 && (
                <div className="col-small">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Subtotal (
                                    {cart.reduce((a, c) => a + c.qty, 0)}{" "}
                                    items): €{" "}
                                    {cart.reduce(
                                        (a, c) => a + c.product.prezzo * c.qty,
                                        0
                                    )}
                                </h2>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={checkoutHandler}
                                    className="button"
                                >
                                    Vai al checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
