import thunk from "redux-thunk";
import {
    productListReducer,
    addToCartReducer,
} from "./reducers/productReducers";
const {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
} = require("redux");

const initialState = {};
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
