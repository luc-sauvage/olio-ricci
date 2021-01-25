const {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ALL_ORDER_LIST_REQUEST,
    ALL_ORDER_LIST_SUCCESS,
    ALL_ORDER_LIST_FAIL,
    DISPATCHED_ORDER_REQUEST,
    DISPATCHED_ORDER_SUCCESS,
    DISPATCHED_ORDER_FAIL,
} = require("../constants/orderConstants");

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const getOrderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true };
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getAllOrdersListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_ORDER_LIST_REQUEST:
            return { loading: true };
        case ALL_ORDER_LIST_SUCCESS:
            return { loading: false, allUserOrders: action.payload };
        case ALL_ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const setDispatchedOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case DISPATCHED_ORDER_REQUEST:
            return { loading: true };
        case DISPATCHED_ORDER_SUCCESS:
            return { loading: false, dispatchedOrder: action.payload };
        case DISPATCHED_ORDER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}