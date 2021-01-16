import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/loadingbox";
import MessageBox from "../components/messagebox";
import ProductLine from "../components/productLine";
import { CREATE_PRODUCT_RESET, EDIT_PRODUCT_RESET } from "../constants/productConstants";

export default function ProductListAdmin(props) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, prodotti } = productList;

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const isAdmin = userInfo.isAdmin;

    const createNewProduct = useSelector((state) => state.createProduct);
    const {
        success,
        loading: loadingNewProduct,
        newProduct,
        error: createError,
    } = createNewProduct;

    const lastEditedProduct = useSelector((state) => state.editProduct);
    const {
        editedProduct,
        error: editError,
        success: editSuccess,
        loading: editLoading,
    } = lastEditedProduct;

    const [createProductFields, setCreateProductFields] = useState(false);

    const [nomeProdotto, setNomeProdotto] = useState("");
    const [descrizioneProdotto, setDescrizioneProdotto] = useState("");
    const [prezzoProdotto, setPrezzoProdotto] = useState(null);
    const [availability, setAvailability] = useState("si");

    function openCreateProductFields () {
        dispatch({ type: EDIT_PRODUCT_RESET });
        setCreateProductFields(true);
    }

    function createProductHandler() {
        dispatch(
            createProduct(
                nomeProdotto,
                descrizioneProdotto,
                Number(prezzoProdotto),
                availability
            )
        );
        setCreateProductFields(false);
    }

     useEffect(() => {
        dispatch({ type: EDIT_PRODUCT_RESET });
        dispatch({ type: CREATE_PRODUCT_RESET });
    }, []);

    useEffect(() => {
        if (isAdmin) {
            dispatch(listProducts());   
        } else {
            props.history.push("/");
        }

    }, [newProduct, editedProduct]);

    return (
        <div>
            <div className="row">
                <h1>Lista prodotti</h1>
                {createNewProduct && loadingNewProduct && (
                    <LoadingBox></LoadingBox>
                )}
                {createNewProduct && success && (
                    <div>
                        <MessageBox className=".alert-info">
                            {newProduct.message}
                        </MessageBox>
                    </div>
                )}
                {createNewProduct && createError && (
                    <div>
                        <MessageBox variant="dangers">{createError}</MessageBox>
                    </div>
                )}
                {editedProduct && editLoading && <LoadingBox></LoadingBox>}
                {editedProduct && editSuccess && (
                    <div>
                        <MessageBox className=".alert-info">
                            Prodotto modificato con successo!
                        </MessageBox>
                    </div>
                )}
                {editedProduct && editError && (
                    <div>
                        <MessageBox className=".alert-info">
                            {editError}
                        </MessageBox>
                    </div>
                )}
                {!createProductFields && (
                    <button
                        type="button"
                        className="button"
                        onClick={openCreateProductFields}
                    >
                        Crea prodotto
                    </button>
                )}
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger"></MessageBox>
            ) : (
                prodotti && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>CODICE PRODOTTO</th>
                                <th>DATA INSERIMENTO O MODIFICA</th>
                                <th>NOME</th>
                                <th>DESCRIZIONE</th>
                                <th>PREZZO</th>
                                <th>FOTO</th>
                                <th>DISPONIBILITÀ</th>
                                <th>MODIFICA</th>
                                <th>CANCELLA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {createProductFields && (
                                <tr>
                                    <td>Assegnato in automatico</td>
                                    <td>Assegnato in automatico</td>
                                    <td>
                                        <input
                                            type="text"
                                            id="input-nome-prodotto"
                                            placeholder="Inserisci nome prodotto"
                                            onChange={(e) =>
                                                setNomeProdotto(e.target.value)
                                            }
                                        ></input>
                                    </td>
                                    <td>
                                        <textarea
                                            type="text"
                                            id="input-descrizione-prodotto"
                                            placeholder="Inserisci descrizione prodotto"
                                            onChange={(e) =>
                                                setDescrizioneProdotto(
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="input-prezzo-prodotto"
                                            placeholder="Inserisci prezzo prodotto"
                                            onChange={(e) =>
                                                setPrezzoProdotto(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </td>
                                    <td>
                                        <button className="button">
                                            Carica foto
                                        </button>
                                    </td>
                                    <td>
                                        <select
                                            id="dispo-prodotto"
                                            onChange={(e) =>
                                                setAvailability(e.target.value)
                                            }
                                        >
                                            <option value="si">Si</option>
                                            <option value="no">No</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={createProductHandler}
                                        >
                                            Salva prodotto
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={() =>
                                                setCreateProductFields(false)
                                            }
                                        >
                                            Annulla
                                        </button>
                                    </td>
                                </tr>
                            )}

                            {prodotti.map((prodotto) => (
                                <ProductLine
                                    prodotto={prodotto}
                                    key={prodotto._id}
                                ></ProductLine>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
}
