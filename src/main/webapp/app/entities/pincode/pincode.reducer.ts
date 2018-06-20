import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IPincode, defaultValue } from 'app/shared/model/pincode.model';

export const ACTION_TYPES = {
  SEARCH_PINCODES: 'pincode/SEARCH_PINCODES',
  FETCH_PINCODE_LIST: 'pincode/FETCH_PINCODE_LIST',
  FETCH_PINCODE: 'pincode/FETCH_PINCODE',
  CREATE_PINCODE: 'pincode/CREATE_PINCODE',
  UPDATE_PINCODE: 'pincode/UPDATE_PINCODE',
  DELETE_PINCODE: 'pincode/DELETE_PINCODE',
  RESET: 'pincode/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPincode>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PincodeState = Readonly<typeof initialState>;

// Reducer

export default (state: PincodeState = initialState, action): PincodeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PINCODES):
    case REQUEST(ACTION_TYPES.FETCH_PINCODE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PINCODE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PINCODE):
    case REQUEST(ACTION_TYPES.UPDATE_PINCODE):
    case REQUEST(ACTION_TYPES.DELETE_PINCODE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PINCODES):
    case FAILURE(ACTION_TYPES.FETCH_PINCODE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PINCODE):
    case FAILURE(ACTION_TYPES.CREATE_PINCODE):
    case FAILURE(ACTION_TYPES.UPDATE_PINCODE):
    case FAILURE(ACTION_TYPES.DELETE_PINCODE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PINCODES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PINCODE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PINCODE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PINCODE):
    case SUCCESS(ACTION_TYPES.UPDATE_PINCODE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PINCODE):
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

const apiUrl = SERVER_API_URL + '/api/pincodes';
const apiSearchUrl = SERVER_API_URL + '/api/_search/pincodes';

// Actions

export const getSearchEntities: ICrudSearchAction<IPincode> = query => ({
  type: ACTION_TYPES.SEARCH_PINCODES,
  payload: axios.get<IPincode>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IPincode> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PINCODE_LIST,
  payload: axios.get<IPincode>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPincode> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PINCODE,
    payload: axios.get<IPincode>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPincode> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PINCODE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPincode> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PINCODE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPincode> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PINCODE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
