import thunk from 'redux-thunk';
import { addToCartReducer } from './reducers/cartReducers';
import { setLastPageReducer } from './reducers/navReducers';
import {
  createOrderReducer,
  getAllOrdersListReducer,
  getOrderDetailsReducer,
  getOrderListReducer,
  setDispatchedOrderReducer,
} from './reducers/orderReducers';
import {
  createProductReducer,
  deleteProductReducer,
  editProductReducer,
  productListReducer,
} from './reducers/productReducers';
import {
  getUserProfileReducer,
  updateUserProfileReducer,
  userLoginReducer,
  userRegistrationReducer,
} from './reducers/userReducers';
const {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} = require('redux');

const initialState = {
  productCart: {
    cart: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
  },
  userLogin: {
    userInfo: localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : '',
  },
  lastPage: {
    lastPage: localStorage.getItem('lastPage')
      ? JSON.parse(localStorage.getItem('lastPage'))
      : '',
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productCart: addToCartReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  lastPage: setLastPageReducer,
  createdOrder: createOrderReducer,
  orderDetails: getOrderDetailsReducer,
  ordersList: getOrderListReducer,
  userProfile: getUserProfileReducer,
  userProfileUpdate: updateUserProfileReducer,
  createProduct: createProductReducer,
  editProduct: editProductReducer,
  deleteProduct: deleteProductReducer,
  allOrdersList: getAllOrdersListReducer,
  dispatchOrder: setDispatchedOrderReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
