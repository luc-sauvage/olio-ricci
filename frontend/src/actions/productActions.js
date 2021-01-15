import Axios from "axios";
import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get("/api/prodotti");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct = (name, description, price, availability) => async (
    dispatch
) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const { data } = await Axios.post("/api/prodotti/crea", {
            name,
            description,
            price,
            availability,
        });
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editProduct = (name, description, price, availability) => async (
    dispatch
) => {
    dispatch({ type: EDIT_PRODUCT_REQUEST });
    try {
        const { data } = await Axios.post("/api/prodotti/modifica", {
            name,
            description,
            price,
            availability,
        });
        dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EDIT_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};