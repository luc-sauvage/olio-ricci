import Axios from "axios";
import { CART_REMOVE_ALL } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants"


export const createOrder = (order) => async (dispatch) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { data } = await Axios.post("/api/orders", order);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({type: CART_REMOVE_ALL});
        localStorage.removeItem("cart");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    try {
        const { data } = await Axios.get(`/api/orders/${orderId}`);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getOrderList = () => async (dispatch) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    try {
        const {data} = await Axios.get("/api/orders/history");
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};