import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IAwb } from 'app/shared/model/awb.model';

export const ACTION_TYPES = {
  FETCH_AWB_LIST: 'awb/FETCH_AWB_LIST',
  FETCH_AWB: 'awb/FETCH_AWB',
  CREATE_AWB: 'awb/CREATE_AWB',
  UPDATE_AWB: 'awb/UPDATE_AWB',
  DELETE_AWB: 'awb/DELETE_AWB',
  RESET: 'awb/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_AWB_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AWB):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AWB):
    case REQUEST(ACTION_TYPES.UPDATE_AWB):
    case REQUEST(ACTION_TYPES.DELETE_AWB):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AWB_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AWB):
    case FAILURE(ACTION_TYPES.CREATE_AWB):
    case FAILURE(ACTION_TYPES.UPDATE_AWB):
    case FAILURE(ACTION_TYPES.DELETE_AWB):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AWB_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AWB):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AWB):
    case SUCCESS(ACTION_TYPES.UPDATE_AWB):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AWB):
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

const apiUrl = SERVER_API_URL + '/api/awbs';

// Actions

export const getEntities: ICrudGetAllAction<IAwb> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AWB_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IAwb>
});

export const getEntity: ICrudGetAction<IAwb> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AWB,
    payload: axios.get(requestUrl) as Promise<IAwb>
  };
};

export const createEntity: ICrudPutAction<IAwb> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AWB,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAwb> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AWB,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAwb> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AWB,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
