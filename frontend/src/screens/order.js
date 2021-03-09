import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLastPageAction } from '../actions/navActions.js';
import { getOrderDetails } from '../actions/orderActions.js';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';

export default function Order(props) {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLogin);
  const { userInfo } = userData;

  const redirect = props.location.pathname;

  const orderId = props.match.params.id;
  console.log(orderId);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (userInfo) {
      dispatch(setLastPageAction(redirect));
      dispatch(getOrderDetails(orderId));
    } else {
      props.history.push('/login');
    }
  }, [props.history, orderId, dispatch]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      {order && Object.keys(order).length && (
        <div>
          <h1>Order {order._id}</h1>
          <div className="row">
            <div className="column top">
              <div className="card card-body">
                <h2>L'ordine contiene</h2>
                <ul>
                  {order &&
                    order.ordine.map((articolo) => (
                      <div className="row" key={articolo.product._id}>
                        <div>
                          <img
                            className="prod-image-small"
                            alt={articolo.product.nome}
                            src={`
                                                           .${articolo.product.foto}`}
                          ></img>
                        </div>
                        <div>
                          <strong>Articolo: </strong>
                          {articolo.product.nome}
                        </div>
                        <div>
                          <strong>Quantità: </strong>
                          {articolo.qty}
                        </div>

                        <div>
                          <strong>Prezzo: </strong>
                          {articolo.product.prezzo}
                        </div>
                      </div>
                    ))}
                </ul>
              </div>
              <div className="card card-body">
                <h2>Dati per la spedizione</h2>
                <p>
                  <strong>Nome:</strong> {order.spedizione.shippingFirstName}
                  <br />
                  <strong>Cognome:</strong> {order.spedizione.shippingLastName}
                  <br />
                  <strong>Indirizzo:</strong> {order.spedizione.shippingAddress}
                  <br />
                  <strong>Comune:</strong> {order.spedizione.shippingCity}
                  <br />
                  <strong>CAP:</strong> {order.spedizione.shippingCAP}
                  <br />
                </p>
              </div>
              <div className="card card-body">
                <h2>Metodo di pagamento</h2>
                <p>{order.metodoPagamento}</p>
              </div>
            </div>
            <div className="column top">
              <div className="card card-body">
                <li>
                  Subtotale ({order.ordine.reduce((a, c) => a + c.qty, 0)}{' '}
                  articoli): €{' '}
                  {order.ordine.reduce(
                    (a, c) => a + c.product.prezzo * c.qty,
                    0
                  )}
                </li>
                <li>Costi spedizione: € {order.costiSpedizione}</li>
                <li>Totale: € {order.totale}</li>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
