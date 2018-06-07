import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IVendor } from 'app/shared/model/vendor.model';

export const ACTION_TYPES = {
  FETCH_VENDOR_LIST: 'vendor/FETCH_VENDOR_LIST',
  FETCH_VENDOR: 'vendor/FETCH_VENDOR',
  CREATE_VENDOR: 'vendor/CREATE_VENDOR',
  UPDATE_VENDOR: 'vendor/UPDATE_VENDOR',
  DELETE_VENDOR: 'vendor/DELETE_VENDOR',
  RESET: 'vendor/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_VENDOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VENDOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VENDOR):
    case REQUEST(ACTION_TYPES.UPDATE_VENDOR):
    case REQUEST(ACTION_TYPES.DELETE_VENDOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VENDOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VENDOR):
    case FAILURE(ACTION_TYPES.CREATE_VENDOR):
    case FAILURE(ACTION_TYPES.UPDATE_VENDOR):
    case FAILURE(ACTION_TYPES.DELETE_VENDOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VENDOR):
    case SUCCESS(ACTION_TYPES.UPDATE_VENDOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VENDOR):
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

const apiUrl = SERVER_API_URL + '/api/vendors';

// Actions

export const getEntities: ICrudGetAllAction<IVendor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VENDOR_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IVendor>
});

export const getEntity: ICrudGetAction<IVendor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VENDOR,
    payload: axios.get(requestUrl) as Promise<IVendor>
  };
};

export const createEntity: ICrudPutAction<IVendor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VENDOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVendor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VENDOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVendor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VENDOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
