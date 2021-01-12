import Axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTRATION_FAIL,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("/api/users/login", {
            email,
            password,
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const registration = (firstName, lastName, email, password) => async (
    dispatch
) => {
    dispatch({
        type: USER_REGISTRATION_REQUEST,
        payload: { firstName, lastName, email, password },
    });
    try {
        const { data } = await Axios.post("/api/users/register", {
            firstName,
            lastName,
            email,
            password,
        });
        dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTRATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userData");
    dispatch({ type: USER_LOGOUT });
};

export const getUserProfile = (userId) => async (dispatch) => {
    dispatch({ type: USER_PROFILE_REQUEST, payload: userId });
    try {
        const {data} = await Axios.get(`api/users/${userId}`);
        dispatch({type: USER_PROFILE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch) => {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST, payload: user });
    try {
        console.log("action is reached");
        const { data } = await Axios.put(`api/users/update-profile`, user);
        dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
        /* dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userData", JSON.stringify(data)); */
    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
