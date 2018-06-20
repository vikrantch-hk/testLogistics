import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICourier, defaultValue } from 'app/shared/model/courier.model';

export const ACTION_TYPES = {
  SEARCH_COURIERS: 'courier/SEARCH_COURIERS',
  FETCH_COURIER_LIST: 'courier/FETCH_COURIER_LIST',
  FETCH_COURIER: 'courier/FETCH_COURIER',
  CREATE_COURIER: 'courier/CREATE_COURIER',
  UPDATE_COURIER: 'courier/UPDATE_COURIER',
  DELETE_COURIER: 'courier/DELETE_COURIER',
  RESET: 'courier/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICourier>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CourierState = Readonly<typeof initialState>;

// Reducer

export default (state: CourierState = initialState, action): CourierState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COURIERS):
    case REQUEST(ACTION_TYPES.FETCH_COURIER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURIER):
    case REQUEST(ACTION_TYPES.UPDATE_COURIER):
    case REQUEST(ACTION_TYPES.DELETE_COURIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COURIERS):
    case FAILURE(ACTION_TYPES.FETCH_COURIER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURIER):
    case FAILURE(ACTION_TYPES.CREATE_COURIER):
    case FAILURE(ACTION_TYPES.UPDATE_COURIER):
    case FAILURE(ACTION_TYPES.DELETE_COURIER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COURIERS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURIER):
    case SUCCESS(ACTION_TYPES.UPDATE_COURIER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURIER):
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

const apiUrl = SERVER_API_URL + '/api/couriers';
const apiSearchUrl = SERVER_API_URL + '/api/_search/couriers';

// Actions

export const getSearchEntities: ICrudSearchAction<ICourier> = query => ({
  type: ACTION_TYPES.SEARCH_COURIERS,
  payload: axios.get<ICourier>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICourier> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COURIER_LIST,
    payload: axios.get<ICourier>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICourier> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURIER,
    payload: axios.get<ICourier>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICourier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURIER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICourier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURIER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourier> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURIER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
