import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IState } from 'app/shared/model/state.model';

export const ACTION_TYPES = {
  FETCH_STATE_LIST: 'state/FETCH_STATE_LIST',
  FETCH_STATE: 'state/FETCH_STATE',
  CREATE_STATE: 'state/CREATE_STATE',
  UPDATE_STATE: 'state/UPDATE_STATE',
  DELETE_STATE: 'state/DELETE_STATE',
  RESET: 'state/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  updating: false,
  updateSuccess: false
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATE):
    case REQUEST(ACTION_TYPES.UPDATE_STATE):
    case REQUEST(ACTION_TYPES.DELETE_STATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATE):
    case FAILURE(ACTION_TYPES.CREATE_STATE):
    case FAILURE(ACTION_TYPES.UPDATE_STATE):
    case FAILURE(ACTION_TYPES.DELETE_STATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATE):
    case SUCCESS(ACTION_TYPES.UPDATE_STATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/states';

// Actions

export const getEntities: ICrudGetAllAction<IState> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STATE_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IState>
});

export const getEntity: ICrudGetAction<IState> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATE,
    payload: axios.get(requestUrl) as Promise<IState>
  };
};

export const createEntity: ICrudPutAction<IState> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IState> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IState> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
