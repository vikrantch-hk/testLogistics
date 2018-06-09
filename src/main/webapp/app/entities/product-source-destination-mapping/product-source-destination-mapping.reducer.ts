import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IProductSourceDestinationMapping } from 'app/shared/model/product-source-destination-mapping.model';

export const ACTION_TYPES = {
  FETCH_PRODUCTSOURCEDESTINATIONMAPPING_LIST: 'productSourceDestinationMapping/FETCH_PRODUCTSOURCEDESTINATIONMAPPING_LIST',
  FETCH_PRODUCTSOURCEDESTINATIONMAPPING: 'productSourceDestinationMapping/FETCH_PRODUCTSOURCEDESTINATIONMAPPING',
  CREATE_PRODUCTSOURCEDESTINATIONMAPPING: 'productSourceDestinationMapping/CREATE_PRODUCTSOURCEDESTINATIONMAPPING',
  UPDATE_PRODUCTSOURCEDESTINATIONMAPPING: 'productSourceDestinationMapping/UPDATE_PRODUCTSOURCEDESTINATIONMAPPING',
  DELETE_PRODUCTSOURCEDESTINATIONMAPPING: 'productSourceDestinationMapping/DELETE_PRODUCTSOURCEDESTINATIONMAPPING',
  RESET: 'productSourceDestinationMapping/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTSOURCEDESTINATIONMAPPING):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTSOURCEDESTINATIONMAPPING):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTSOURCEDESTINATIONMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTSOURCEDESTINATIONMAPPING):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTSOURCEDESTINATIONMAPPING):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTSOURCEDESTINATIONMAPPING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTSOURCEDESTINATIONMAPPING):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTSOURCEDESTINATIONMAPPING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTSOURCEDESTINATIONMAPPING):
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

const apiUrl = SERVER_API_URL + '/api/product-source-destination-mappings';

// Actions

export const getEntities: ICrudGetAllAction<IProductSourceDestinationMapping> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IProductSourceDestinationMapping>
});

export const getEntity: ICrudGetAction<IProductSourceDestinationMapping> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTSOURCEDESTINATIONMAPPING,
    payload: axios.get(requestUrl) as Promise<IProductSourceDestinationMapping>
  };
};

export const createEntity: ICrudPutAction<IProductSourceDestinationMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTSOURCEDESTINATIONMAPPING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProductSourceDestinationMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTSOURCEDESTINATIONMAPPING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductSourceDestinationMapping> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTSOURCEDESTINATIONMAPPING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
