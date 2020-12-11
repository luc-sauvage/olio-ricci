import thunk from "redux-thunk";
import { addToCartReducer, changeCartQuantityReducer } from "./reducers/cartReducers";
import { productListReducer } from "./reducers/productReducers";
const {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
} = require("redux");

const initialState = {
    productCart: {
        cart: localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [],
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productCart: addToCartReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
