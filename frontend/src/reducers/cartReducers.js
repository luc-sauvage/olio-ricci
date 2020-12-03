const { CART_ADD_ITEM } = require("../constants/cartConstants");

export const addToCartReducer = (state = { cart: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            let item = action.payload;
            console.log("item in reducer: ", item);
            console.log("state.cart", state.cart);
            let cart = state.cart;
            console.log("item.product._id : ", item.product._id);

            const found = cart.find(
                (element) => element.product._id === item.product._id
            );
            console.log("found: ", found);
            if (found) {
                item.product = found.product;
                item.qty = item.qty + found.qty;
                cart.delete(found);
                console.log("item: ", item);
                return {
                    ...state,
                    cart: [...cart, item],
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
