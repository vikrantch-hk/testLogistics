import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IProductGroup } from 'app/shared/model/product-group.model';

export const ACTION_TYPES = {
  FETCH_PRODUCTGROUP_LIST: 'productGroup/FETCH_PRODUCTGROUP_LIST',
  FETCH_PRODUCTGROUP: 'productGroup/FETCH_PRODUCTGROUP',
  CREATE_PRODUCTGROUP: 'productGroup/CREATE_PRODUCTGROUP',
  UPDATE_PRODUCTGROUP: 'productGroup/UPDATE_PRODUCTGROUP',
  DELETE_PRODUCTGROUP: 'productGroup/DELETE_PRODUCTGROUP',
  RESET: 'productGroup/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTGROUP):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTGROUP):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTGROUP):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTGROUP):
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

const apiUrl = SERVER_API_URL + '/api/product-groups';

// Actions

export const getEntities: ICrudGetAllAction<IProductGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODUCTGROUP_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IProductGroup>
});

export const getEntity: ICrudGetAction<IProductGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTGROUP,
    payload: axios.get(requestUrl) as Promise<IProductGroup>
  };
};

export const createEntity: ICrudPutAction<IProductGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProductGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTGROUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
