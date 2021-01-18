const {
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_RESET
} = require("../constants/userConstants");

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT: 
            return {};
        default:
            return state;
    }
};

export const userRegistrationReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTRATION_REQUEST:
            return { loading: true };
        case USER_REGISTRATION_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTRATION_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const getUserProfileReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true };
        case USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return { loading: true };
        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_PROFILE_UPDATE_RESET:
            return {};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};
