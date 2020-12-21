const {SET_LAST_VISITED} = require("../constants/navConstants");

export const setLastPageReducer = (state = "", action) => {
    switch (action.type) {
        case SET_LAST_VISITED:
            return { lastPage: action.payload };
        default:
            return state;
    }
};