import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IPickupStatus } from 'app/shared/model/pickup-status.model';

export const ACTION_TYPES = {
  FETCH_PICKUPSTATUS_LIST: 'pickupStatus/FETCH_PICKUPSTATUS_LIST',
  FETCH_PICKUPSTATUS: 'pickupStatus/FETCH_PICKUPSTATUS',
  CREATE_PICKUPSTATUS: 'pickupStatus/CREATE_PICKUPSTATUS',
  UPDATE_PICKUPSTATUS: 'pickupStatus/UPDATE_PICKUPSTATUS',
  DELETE_PICKUPSTATUS: 'pickupStatus/DELETE_PICKUPSTATUS',
  RESET: 'pickupStatus/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_PICKUPSTATUS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PICKUPSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PICKUPSTATUS):
    case REQUEST(ACTION_TYPES.UPDATE_PICKUPSTATUS):
    case REQUEST(ACTION_TYPES.DELETE_PICKUPSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PICKUPSTATUS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PICKUPSTATUS):
    case FAILURE(ACTION_TYPES.CREATE_PICKUPSTATUS):
    case FAILURE(ACTION_TYPES.UPDATE_PICKUPSTATUS):
    case FAILURE(ACTION_TYPES.DELETE_PICKUPSTATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PICKUPSTATUS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PICKUPSTATUS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PICKUPSTATUS):
    case SUCCESS(ACTION_TYPES.UPDATE_PICKUPSTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PICKUPSTATUS):
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

const apiUrl = SERVER_API_URL + '/api/pickup-statuses';

// Actions

export const getEntities: ICrudGetAllAction<IPickupStatus> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PICKUPSTATUS_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IPickupStatus>
});

export const getEntity: ICrudGetAction<IPickupStatus> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PICKUPSTATUS,
    payload: axios.get(requestUrl) as Promise<IPickupStatus>
  };
};

export const createEntity: ICrudPutAction<IPickupStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PICKUPSTATUS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPickupStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PICKUPSTATUS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPickupStatus> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PICKUPSTATUS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
