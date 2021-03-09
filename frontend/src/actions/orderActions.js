import Axios from 'axios';
import { CART_REMOVE_ALL } from '../constants/cartConstants';
import {
  ALL_ORDER_LIST_FAIL,
  ALL_ORDER_LIST_REQUEST,
  ALL_ORDER_LIST_SUCCESS,
  DISPATCHED_ORDER_FAIL,
  DISPATCHED_ORDER_REQUEST,
  DISPATCHED_ORDER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_REMOVE_ALL });
    localStorage.removeItem('cart');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/orders/history/', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrdersList = () => async (dispatch, getState) => {
  dispatch({ type: ALL_ORDER_LIST_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ALL_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setDispatchedOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: DISPATCHED_ORDER_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      '/api/orders/dispatched',
      { orderId },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DISPATCHED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DISPATCHED_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
