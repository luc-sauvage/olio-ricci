import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/loadingbox";
import MessageBox from "../components/messagebox";
import ProductLine from "../components/productLine";
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, EDIT_PRODUCT_RESET } from "../constants/productConstants";
import Axios from "axios";

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

    const lastDeletedProduct = useSelector((state) => state.deleteProduct);
    const {deletedProduct, success: deleteSuccess, loading: deleteLoading, error: deleteError} = lastDeletedProduct; 

    const [createProductFields, setCreateProductFields] = useState(false);

    const [nomeProdotto, setNomeProdotto] = useState("");
    const [descrizioneProdotto, setDescrizioneProdotto] = useState("");
    const [prezzoProdotto, setPrezzoProdotto] = useState(null);
    const [availability, setAvailability] = useState("si");

    const chooseImageButton = useRef();

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState("");
    const [image, setImage] = useState("");


    function openCreateProductFields() {
        dispatch({ type: EDIT_PRODUCT_RESET });
        dispatch({ type: DELETE_PRODUCT_RESET });
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

    async function uploadFileHandler(e) {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post("/api/uploads", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

     useEffect(() => {
        dispatch({ type: EDIT_PRODUCT_RESET });
        dispatch({ type: CREATE_PRODUCT_RESET });
        dispatch({ type: DELETE_PRODUCT_RESET });
    }, []);

    useEffect(() => {
        if (isAdmin) {
            dispatch(listProducts());   
        } else {
            props.history.push("/");
        }
    }, [newProduct, editedProduct, deletedProduct]);

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
                        <MessageBox className=".alert-danger">
                            {editError}
                        </MessageBox>
                    </div>
                )}
                {deletedProduct && deleteLoading && <LoadingBox></LoadingBox>}
                {deletedProduct && deleteSuccess && (
                    <div>
                        <MessageBox className=".alert-info">
                            Prodotto eliminato con successo!
                        </MessageBox>
                    </div>
                )}
                {deletedProduct && deleteError && (
                    <div>
                        <MessageBox className=".alert-danger">
                            {deleteError}
                        </MessageBox>
                    </div>
                )}
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                    <MessageBox className=".alert-danger">{errorUpload}</MessageBox>
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
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={() =>
                                                chooseImageButton.current.click()
                                            }
                                        >
                                            Scegli foto
                                        </button>
                                        <input
                                            ref={chooseImageButton}
                                            type="file"
                                            id="imageFile"
                                            onChange={uploadFileHandler}
                                            style={{ display: "none" }}
                                        ></input>
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
