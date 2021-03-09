import { SET_LAST_VISITED } from '../constants/navConstants';

export const setLastPageAction = (path) => async (dispatch) => {
  dispatch({
    type: SET_LAST_VISITED,
    payload: path,
  });
  localStorage.setItem('lastPage', JSON.stringify(path));
};
