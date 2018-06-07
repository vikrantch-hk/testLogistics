import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IRegionType } from 'app/shared/model/region-type.model';

export const ACTION_TYPES = {
  FETCH_REGIONTYPE_LIST: 'regionType/FETCH_REGIONTYPE_LIST',
  FETCH_REGIONTYPE: 'regionType/FETCH_REGIONTYPE',
  CREATE_REGIONTYPE: 'regionType/CREATE_REGIONTYPE',
  UPDATE_REGIONTYPE: 'regionType/UPDATE_REGIONTYPE',
  DELETE_REGIONTYPE: 'regionType/DELETE_REGIONTYPE',
  RESET: 'regionType/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_REGIONTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REGIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REGIONTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_REGIONTYPE):
    case REQUEST(ACTION_TYPES.DELETE_REGIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REGIONTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REGIONTYPE):
    case FAILURE(ACTION_TYPES.CREATE_REGIONTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_REGIONTYPE):
    case FAILURE(ACTION_TYPES.DELETE_REGIONTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGIONTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGIONTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REGIONTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_REGIONTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REGIONTYPE):
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

const apiUrl = SERVER_API_URL + '/api/region-types';

// Actions

export const getEntities: ICrudGetAllAction<IRegionType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REGIONTYPE_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IRegionType>
});

export const getEntity: ICrudGetAction<IRegionType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REGIONTYPE,
    payload: axios.get(requestUrl) as Promise<IRegionType>
  };
};

export const createEntity: ICrudPutAction<IRegionType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REGIONTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRegionType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REGIONTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRegionType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REGIONTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
