const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    ADD_PRODUCT_CART,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
} = require("../constants/productConstants");

export const productListReducer = (state = { prodotti: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, prodotti: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const addToCartReducer = (state = { productsInCart: [] }, action) => {
    switch (action.type) {
        case ADD_PRODUCT_CART:
            return { loading: true };
        case ADD_PRODUCT_SUCCESS:
            return { loading: false, productsInCart: action.payload };
        case ADD_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
