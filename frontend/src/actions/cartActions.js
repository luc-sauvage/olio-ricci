import { CART_ADD_ITEM, CART_REMOVE_ITEM, CHANGE_QTY_CART } from "../constants/cartConstants";

export const addProductToCart = (product, itemQty) => async (dispatch, getState) => {
    var qty = Number(itemQty);
    dispatch({
        type: CART_ADD_ITEM,
        payload: { product, qty },
    });
    localStorage.setItem("cart", JSON.stringify(getState().productCart.cart));
};

export const changeCartQuantity = (product, itemQty) => async (dispatch, getState) => {
    var qty = Number(itemQty);
    dispatch({
        type: CHANGE_QTY_CART,
        payload: { product, qty },
    });
    localStorage.setItem("cart", JSON.stringify(getState().productCart.cart));
}

export const removeFromCart = (productId) => (dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId,
    });
    localStorage.setItem("cart", JSON.stringify(getState().productCart.cart));
}
