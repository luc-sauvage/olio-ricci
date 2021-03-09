import { BrowserRouter, Route } from 'react-router-dom';
import Shop from './screens/shop';
import Home from './screens/home';
import Cart from './screens/cart';
import LogIn from './screens/login';
import Registration from './screens/registration';
import Shipping from './screens/shipping';
import Payment from './screens/payment';
import PlaceOrder from './screens/placeOrder';
import Order from './screens/order';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderHistory from './screens/orderHistory';
import Profile from './screens/profile';
import ProductListAdmin from './screens/productListAdmin';
import OrderListAdmin from './screens/orderListAdmin';
import Navbar from './components/navbar';
const promise = loadStripe(
  'pk_test_51I6FuaBAowNX0CrKTv5CPsbyKpFuRwi3RJnrfNiBhjPhwxVANEoxNTPosoTfSTI6Fo5BDWErnZ7FvdE3ZnJNGoei00WDoA4BLh'
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="grid-template">
        <Navbar></Navbar>
        <main>
          <Route exact path="/shop" component={Shop}></Route>
          <Route exact path="/cart" component={Cart}></Route>
          <Route exact path="/shipping" component={Shipping}></Route>
          <Route exact path="/payment" component={Payment}></Route>
          <Elements stripe={promise}>
            <Route exact path="/place-order" component={PlaceOrder}></Route>
          </Elements>
          <Route exact path="/order/:id" component={Order}></Route>
          <Route exact path="/orderhistory" component={OrderHistory}></Route>
          <Route exact path="/admin-orders" component={OrderListAdmin}></Route>
          <Route
            exact
            path="/admin-products"
            component={ProductListAdmin}
          ></Route>
          <Route exact path="/login" component={LogIn}></Route>
          <Route exact path="/registration" component={Registration}></Route>
          <Route exact path="/user-profile" component={Profile}></Route>
          <Route exact path="/" component={Home}></Route>
        </main>
        <footer className="row centered">
          All rights reserved - Azienda Agricola Alessandro Ricci - via della
          Variante 2, 05020 Montecchio
        </footer>
      </div>
    </BrowserRouter>
  );
}
