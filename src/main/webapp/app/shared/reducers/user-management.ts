import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IUser } from 'app/shared/model/user.model';

export const ACTION_TYPES = {
  FETCH_USERS: 'userManagement/FETCH_USERS',
  RESET: 'userManagement/RESET'
};

const initialState = {
  errorMessage: null,
  users: []
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERS):
      return {
        ...state
      };
    case FAILURE(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        users: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
};

const apiUrl = '/api/users';
// Actions
export const getUsers: ICrudGetAllAction<IUser> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USERS,
    payload: axios.get(requestUrl) as Promise<IUser>
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
