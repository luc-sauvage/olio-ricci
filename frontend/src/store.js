import thunk from "redux-thunk";
import { addToCartReducer } from "./reducers/cartReducers";
import { productListReducer } from "./reducers/productReducers";
import { userLoginReducer } from "./reducers/userReducers";
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
    userLogin: {
        userInfo: localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : "",
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productCart: addToCartReducer,
    userLogin: userLoginReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
