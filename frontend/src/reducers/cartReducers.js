const {
  CART_ADD_ITEM,
  CHANGE_QTY_CART,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_REMOVE_ALL,
} = require('../constants/cartConstants');

export const addToCartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      let item = action.payload;
      let cart = state.cart;

      const found = cart.find(
        (element) => element.product._id === item.product._id
      );
      if (found) {
        item.product = found.product;
        let newQty = item.qty + found.qty;
        let newCart = cart.map((element) => {
          if (element.product._id === found.product._id) {
            return { ...element, qty: newQty };
          } else {
            return element;
          }
        });
        return {
          ...state,
          cart: newCart,
        };
      } else {
        return {
          ...state,
          cart: [...cart, item],
        };
      }

    case CHANGE_QTY_CART:
      let addedItem = action.payload;
      let modifiedCart = state.cart;

      const foundInCart = modifiedCart.find(
        (element) => element.product._id === addedItem.product._id
      );
      if (foundInCart) {
        addedItem.product = foundInCart.product;
        let newCart = modifiedCart.map((element) => {
          if (element.product._id === foundInCart.product._id) {
            return { ...element, qty: addedItem.qty };
          } else {
            return element;
          }
        });
        return {
          ...state,
          cart: newCart,
        };
      } else {
        return {
          ...state,
          cart: [...cart, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(
          (element) => element.product._id !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_REMOVE_ALL:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
