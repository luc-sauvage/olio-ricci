import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct } from "../actions/productActions";
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, EDIT_PRODUCT_RESET } from "../constants/productConstants";
import Axios from "axios";

export default function ProductLine({ prodotto }) {

    if (prodotto.foto.includes("frontend")) {
        prodotto.foto = prodotto.foto.replace("/frontend/public", ".");
    
    }

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState("");
    const [nomeProdotto, setNomeProdotto] = useState("");
    const [descrizioneProdotto, setDescrizioneProdotto] = useState("");
    const [prezzoProdotto, setPrezzoProdotto] = useState("");
    const [availability, setAvailability] = useState("");
    const [image, setImage] = useState("");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState("");

    function saveChanges() {
        dispatch({ type: CREATE_PRODUCT_RESET });
        dispatch({type: DELETE_PRODUCT_RESET});
        dispatch(editProduct(prodotto._id, nomeProdotto, descrizioneProdotto, image, prezzoProdotto, availability));
        setEditMode(false);
    }

    function deleteProductFoo(productId) {
        dispatch(deleteProduct(productId));
        dispatch({ type: CREATE_PRODUCT_RESET });
        dispatch({type: EDIT_PRODUCT_RESET});
    }
    const chooseImageButton = useRef();

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

    return (
        <tr key={prodotto._id}>
            <td>{prodotto._id}</td>
            <td>{prodotto.updatedAt.substring(0, 10)}</td>
            {!editMode && (
                <>
                    <td>{prodotto.nome}</td>
                    <td>{prodotto.descrizione}</td>
                    <td>{prodotto.prezzo}</td>
                    <td>
                        <img
                            className="prod-image-small"
                            src={prodotto.foto}
                            alt={prodotto.nome}
                        ></img>
                    </td>
                    <td>{prodotto.disponibile}</td>
                </>
            )}
            {editMode && (
                <>
                    <td>
                        <input
                            type="text"
                            id="nome-prodotto"
                            placeholder={prodotto.nome}
                            onChange={(e) => setNomeProdotto(e.target.value)}
                        ></input>
                    </td>
                    <td>
                        <textarea
                            type="text"
                            id="descrizione-prodotto"
                            placeholder={prodotto.descrizione}
                            onChange={(e) =>
                                setDescrizioneProdotto(e.target.value)
                            }
                        ></textarea>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="prezzo-prodotto"
                            placeholder={prodotto.prezzo}
                            onChange={(e) => setPrezzoProdotto(e.target.value)}
                        ></input>
                    </td>
                    <td className="row">
                        <img
                            className="prod-image-small"
                            src={prodotto.foto}
                            alt={prodotto.nome}
                        ></img>
                        <button
                            type="button"
                            className="button"
                            onClick={() => chooseImageButton.current.click()}
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
                            onChange={(e) => setAvailability(e.target.value)}
                        >
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </select>
                    </td>
                </>
            )}
            <td>
                {!editMode ? (
                    <button
                        type="button"
                        className="button"
                        onClick={() => setEditMode(true)}
                    >
                        Modifica
                    </button>
                ) : (
                    <button
                        type="button"
                        className="button"
                        onClick={saveChanges}
                    >
                        Salva
                    </button>
                )}
            </td>
            <td>
                {editMode ? (
                    <button
                        type="button"
                        className="button"
                        onClick={() => setEditMode(false)}
                    >
                        Annulla
                    </button>
                ) : (
                    <button
                        type="button"
                        className="button"
                        onClick={() => deleteProductFoo(prodotto._id)}
                    >
                        Elimina
                    </button>
                )}
            </td>
        </tr>
    );
}
