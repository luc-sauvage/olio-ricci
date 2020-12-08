const { CART_ADD_ITEM } = require("../constants/cartConstants");

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
                let newQty = item.qty + found.qty
                let newCart = cart.map(element => {
                    if (element.product._id === found.product._id) {
                        return { ...element, qty: newQty }
                    } else {
                        return element;
                    }
                })
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
        default:
            return state;
    }
};
