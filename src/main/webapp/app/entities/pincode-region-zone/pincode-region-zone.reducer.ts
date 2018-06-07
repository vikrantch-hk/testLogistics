import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IPincodeRegionZone } from 'app/shared/model/pincode-region-zone.model';

export const ACTION_TYPES = {
  FETCH_PINCODEREGIONZONE_LIST: 'pincodeRegionZone/FETCH_PINCODEREGIONZONE_LIST',
  FETCH_PINCODEREGIONZONE: 'pincodeRegionZone/FETCH_PINCODEREGIONZONE',
  CREATE_PINCODEREGIONZONE: 'pincodeRegionZone/CREATE_PINCODEREGIONZONE',
  UPDATE_PINCODEREGIONZONE: 'pincodeRegionZone/UPDATE_PINCODEREGIONZONE',
  DELETE_PINCODEREGIONZONE: 'pincodeRegionZone/DELETE_PINCODEREGIONZONE',
  RESET: 'pincodeRegionZone/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_PINCODEREGIONZONE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PINCODEREGIONZONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PINCODEREGIONZONE):
    case REQUEST(ACTION_TYPES.UPDATE_PINCODEREGIONZONE):
    case REQUEST(ACTION_TYPES.DELETE_PINCODEREGIONZONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PINCODEREGIONZONE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PINCODEREGIONZONE):
    case FAILURE(ACTION_TYPES.CREATE_PINCODEREGIONZONE):
    case FAILURE(ACTION_TYPES.UPDATE_PINCODEREGIONZONE):
    case FAILURE(ACTION_TYPES.DELETE_PINCODEREGIONZONE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PINCODEREGIONZONE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PINCODEREGIONZONE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PINCODEREGIONZONE):
    case SUCCESS(ACTION_TYPES.UPDATE_PINCODEREGIONZONE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PINCODEREGIONZONE):
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

const apiUrl = SERVER_API_URL + '/api/pincode-region-zones';

// Actions

export const getEntities: ICrudGetAllAction<IPincodeRegionZone> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PINCODEREGIONZONE_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IPincodeRegionZone>
});

export const getEntity: ICrudGetAction<IPincodeRegionZone> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PINCODEREGIONZONE,
    payload: axios.get(requestUrl) as Promise<IPincodeRegionZone>
  };
};

export const createEntity: ICrudPutAction<IPincodeRegionZone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PINCODEREGIONZONE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPincodeRegionZone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PINCODEREGIONZONE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPincodeRegionZone> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PINCODEREGIONZONE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
