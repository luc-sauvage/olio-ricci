import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CHANGE_QTY_CART,
} from '../constants/cartConstants';

export const addProductToCart = (product, itemQty) => async (
  dispatch,
  getState
) => {
  var qty = Number(itemQty);
  dispatch({
    type: CART_ADD_ITEM,
    payload: { product, qty },
  });
  localStorage.setItem('cart', JSON.stringify(getState().productCart.cart));
};

export const changeCartQuantity = (product, itemQty) => async (
  dispatch,
  getState
) => {
  var qty = Number(itemQty);
  dispatch({
    type: CHANGE_QTY_CART,
    payload: { product, qty },
  });
  localStorage.setItem('cart', JSON.stringify(getState().productCart.cart));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem('cart', JSON.stringify(getState().productCart.cart));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
