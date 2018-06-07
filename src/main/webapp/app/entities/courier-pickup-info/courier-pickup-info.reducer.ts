import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICourierPickupInfo } from 'app/shared/model/courier-pickup-info.model';

export const ACTION_TYPES = {
  FETCH_COURIERPICKUPINFO_LIST: 'courierPickupInfo/FETCH_COURIERPICKUPINFO_LIST',
  FETCH_COURIERPICKUPINFO: 'courierPickupInfo/FETCH_COURIERPICKUPINFO',
  CREATE_COURIERPICKUPINFO: 'courierPickupInfo/CREATE_COURIERPICKUPINFO',
  UPDATE_COURIERPICKUPINFO: 'courierPickupInfo/UPDATE_COURIERPICKUPINFO',
  DELETE_COURIERPICKUPINFO: 'courierPickupInfo/DELETE_COURIERPICKUPINFO',
  RESET: 'courierPickupInfo/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_COURIERPICKUPINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURIERPICKUPINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURIERPICKUPINFO):
    case REQUEST(ACTION_TYPES.UPDATE_COURIERPICKUPINFO):
    case REQUEST(ACTION_TYPES.DELETE_COURIERPICKUPINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COURIERPICKUPINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURIERPICKUPINFO):
    case FAILURE(ACTION_TYPES.CREATE_COURIERPICKUPINFO):
    case FAILURE(ACTION_TYPES.UPDATE_COURIERPICKUPINFO):
    case FAILURE(ACTION_TYPES.DELETE_COURIERPICKUPINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERPICKUPINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERPICKUPINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURIERPICKUPINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_COURIERPICKUPINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURIERPICKUPINFO):
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

const apiUrl = SERVER_API_URL + '/api/courier-pickup-infos';

// Actions

export const getEntities: ICrudGetAllAction<ICourierPickupInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COURIERPICKUPINFO_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<ICourierPickupInfo>
});

export const getEntity: ICrudGetAction<ICourierPickupInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURIERPICKUPINFO,
    payload: axios.get(requestUrl) as Promise<ICourierPickupInfo>
  };
};

export const createEntity: ICrudPutAction<ICourierPickupInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURIERPICKUPINFO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICourierPickupInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURIERPICKUPINFO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourierPickupInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURIERPICKUPINFO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
