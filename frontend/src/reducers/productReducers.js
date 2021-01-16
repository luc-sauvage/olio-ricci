const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    EDIT_PRODUCT_RESET
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

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return { loading: true };
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
                newProduct: action.payload,
            };
        case CREATE_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};

export const editProductReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_PRODUCT_REQUEST:
            return { loading: true };
        case EDIT_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
                editedProduct: action.payload,
            };
        case EDIT_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case EDIT_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};
