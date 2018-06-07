import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IHub } from 'app/shared/model/hub.model';

export const ACTION_TYPES = {
  FETCH_HUB_LIST: 'hub/FETCH_HUB_LIST',
  FETCH_HUB: 'hub/FETCH_HUB',
  CREATE_HUB: 'hub/CREATE_HUB',
  UPDATE_HUB: 'hub/UPDATE_HUB',
  DELETE_HUB: 'hub/DELETE_HUB',
  RESET: 'hub/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_HUB_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HUB):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HUB):
    case REQUEST(ACTION_TYPES.UPDATE_HUB):
    case REQUEST(ACTION_TYPES.DELETE_HUB):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HUB_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HUB):
    case FAILURE(ACTION_TYPES.CREATE_HUB):
    case FAILURE(ACTION_TYPES.UPDATE_HUB):
    case FAILURE(ACTION_TYPES.DELETE_HUB):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HUB_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HUB):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HUB):
    case SUCCESS(ACTION_TYPES.UPDATE_HUB):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HUB):
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

const apiUrl = SERVER_API_URL + '/api/hubs';

// Actions

export const getEntities: ICrudGetAllAction<IHub> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HUB_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IHub>
});

export const getEntity: ICrudGetAction<IHub> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HUB,
    payload: axios.get(requestUrl) as Promise<IHub>
  };
};

export const createEntity: ICrudPutAction<IHub> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HUB,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHub> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HUB,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHub> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HUB,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
