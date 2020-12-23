import thunk from "redux-thunk";
import { addToCartReducer } from "./reducers/cartReducers";
import { setLastPageReducer } from "./reducers/navReducers";
import { productListReducer } from "./reducers/productReducers";
import { userLoginReducer, userRegistrationReducer } from "./reducers/userReducers";
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
    },
    lastPage: {
        lastPage: localStorage.getItem("lastPage")
        ? JSON.parse(localStorage.getItem("lastPage"))
        : "",
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productCart: addToCartReducer,
    userLogin: userLoginReducer,
    userRegistration: userRegistrationReducer,
    lastPage: setLastPageReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
