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
                let newQty = item.qty + found.qty
                /* item.qty = item.qty + found.qty; */
                console.log("item: ", item);
                let newCart = state.cart.map(element => {
                    console.log("found._id", found._id);
                    console.log("element._id", element._id);
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
