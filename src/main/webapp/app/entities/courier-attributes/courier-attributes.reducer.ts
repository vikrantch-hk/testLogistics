import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICourierAttributes } from 'app/shared/model/courier-attributes.model';

export const ACTION_TYPES = {
  FETCH_COURIERATTRIBUTES_LIST: 'courierAttributes/FETCH_COURIERATTRIBUTES_LIST',
  FETCH_COURIERATTRIBUTES: 'courierAttributes/FETCH_COURIERATTRIBUTES',
  CREATE_COURIERATTRIBUTES: 'courierAttributes/CREATE_COURIERATTRIBUTES',
  UPDATE_COURIERATTRIBUTES: 'courierAttributes/UPDATE_COURIERATTRIBUTES',
  DELETE_COURIERATTRIBUTES: 'courierAttributes/DELETE_COURIERATTRIBUTES',
  RESET: 'courierAttributes/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_COURIERATTRIBUTES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURIERATTRIBUTES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURIERATTRIBUTES):
    case REQUEST(ACTION_TYPES.UPDATE_COURIERATTRIBUTES):
    case REQUEST(ACTION_TYPES.DELETE_COURIERATTRIBUTES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COURIERATTRIBUTES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURIERATTRIBUTES):
    case FAILURE(ACTION_TYPES.CREATE_COURIERATTRIBUTES):
    case FAILURE(ACTION_TYPES.UPDATE_COURIERATTRIBUTES):
    case FAILURE(ACTION_TYPES.DELETE_COURIERATTRIBUTES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERATTRIBUTES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERATTRIBUTES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURIERATTRIBUTES):
    case SUCCESS(ACTION_TYPES.UPDATE_COURIERATTRIBUTES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURIERATTRIBUTES):
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

const apiUrl = SERVER_API_URL + '/api/courier-attributes';

// Actions

export const getEntities: ICrudGetAllAction<ICourierAttributes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COURIERATTRIBUTES_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<ICourierAttributes>
});

export const getEntity: ICrudGetAction<ICourierAttributes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURIERATTRIBUTES,
    payload: axios.get(requestUrl) as Promise<ICourierAttributes>
  };
};

export const createEntity: ICrudPutAction<ICourierAttributes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURIERATTRIBUTES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICourierAttributes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURIERATTRIBUTES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourierAttributes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURIERATTRIBUTES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
