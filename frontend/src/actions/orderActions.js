import Axios from "axios";
import { CART_REMOVE_ALL } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"


export const createOrder = (order) => async (dispatch) => {
    console.log("order action runs"); 
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        console.log("action about to send order to backend");
        console.log("logging order", order)
        const { data } = await Axios.post("/api/orders", order);
        console.log("data back from backend", data);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({type: CART_REMOVE_ALL});
        localStorage.removeItem("cart");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response
                ? error.response.data.message
                : error.message,
        });
    }
};