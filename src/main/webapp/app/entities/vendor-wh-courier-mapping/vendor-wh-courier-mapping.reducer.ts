import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';

export const ACTION_TYPES = {
  FETCH_VENDORWHCOURIERMAPPING_LIST: 'vendorWHCourierMapping/FETCH_VENDORWHCOURIERMAPPING_LIST',
  FETCH_VENDORWHCOURIERMAPPING: 'vendorWHCourierMapping/FETCH_VENDORWHCOURIERMAPPING',
  CREATE_VENDORWHCOURIERMAPPING: 'vendorWHCourierMapping/CREATE_VENDORWHCOURIERMAPPING',
  UPDATE_VENDORWHCOURIERMAPPING: 'vendorWHCourierMapping/UPDATE_VENDORWHCOURIERMAPPING',
  DELETE_VENDORWHCOURIERMAPPING: 'vendorWHCourierMapping/DELETE_VENDORWHCOURIERMAPPING',
  RESET: 'vendorWHCourierMapping/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VENDORWHCOURIERMAPPING):
    case REQUEST(ACTION_TYPES.UPDATE_VENDORWHCOURIERMAPPING):
    case REQUEST(ACTION_TYPES.DELETE_VENDORWHCOURIERMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING):
    case FAILURE(ACTION_TYPES.CREATE_VENDORWHCOURIERMAPPING):
    case FAILURE(ACTION_TYPES.UPDATE_VENDORWHCOURIERMAPPING):
    case FAILURE(ACTION_TYPES.DELETE_VENDORWHCOURIERMAPPING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VENDORWHCOURIERMAPPING):
    case SUCCESS(ACTION_TYPES.UPDATE_VENDORWHCOURIERMAPPING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VENDORWHCOURIERMAPPING):
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

const apiUrl = SERVER_API_URL + '/api/vendor-wh-courier-mappings';

// Actions

export const getEntities: ICrudGetAllAction<IVendorWHCourierMapping> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IVendorWHCourierMapping>
});

export const getEntity: ICrudGetAction<IVendorWHCourierMapping> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VENDORWHCOURIERMAPPING,
    payload: axios.get(requestUrl) as Promise<IVendorWHCourierMapping>
  };
};

export const createEntity: ICrudPutAction<IVendorWHCourierMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VENDORWHCOURIERMAPPING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVendorWHCourierMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VENDORWHCOURIERMAPPING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVendorWHCourierMapping> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VENDORWHCOURIERMAPPING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
