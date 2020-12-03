import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addProductToCart = (product, itemQty) => async (dispatch) => {
    var qty = Number(itemQty);
    dispatch({
        type: CART_ADD_ITEM,
        payload: { product, qty },
    });
};
