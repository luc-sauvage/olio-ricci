import React, { useEffect } from "react";
import LoadingBox from "./components/loadingbox.js";
import MessageBox from "./components/messagebox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./actions/productActions.js";
import { addProductToCart } from "./actions/cartActions.js";
import Select from "react-select";
import Card from "./components/card.js"

export default function Shop() {
    const dispatch = useDispatch();
    /* let [quantita, setQuantita] = useState(1); */
    /* let [selectedOption, setSelectedOption] = useState(null); */
    const productList = useSelector((state) => state.productList);
    const { loading, error, prodotti } = productList;

    /* const selectOptions = [
        {value: 1, label: 1},
        {value: 2, label: 2},
        {value: 3, label: 3},
        {value: 4, label: 4},
        {value: 5, label: 5},
        {value: 6, label: 6},
        {value: 7, label: 7},
        {value: 8, label: 8},
        {value: 9, label: 9},
        {value: 10, label: 10},
    ]; */

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const addToCartHandler = (prodotto, qty) => {
        
        dispatch(addProductToCart(prodotto, qty));
        /* dispatch(addProductToCart(prodotto, qty.value));
        setSelectedOption(null); */
    };

    return (
        <div className="row centered">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                prodotti.map((prodotto) => (
                    <Card key={prodotto._id} prodotto={prodotto}></Card>
                ))
            )}
        </div>
    );
}
