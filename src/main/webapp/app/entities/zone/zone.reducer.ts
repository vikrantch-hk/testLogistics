import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IZone, defaultValue } from 'app/shared/model/zone.model';

export const ACTION_TYPES = {
  SEARCH_ZONES: 'zone/SEARCH_ZONES',
  FETCH_ZONE_LIST: 'zone/FETCH_ZONE_LIST',
  FETCH_ZONE: 'zone/FETCH_ZONE',
  CREATE_ZONE: 'zone/CREATE_ZONE',
  UPDATE_ZONE: 'zone/UPDATE_ZONE',
  DELETE_ZONE: 'zone/DELETE_ZONE',
  RESET: 'zone/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IZone>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ZoneState = Readonly<typeof initialState>;

// Reducer

export default (state: ZoneState = initialState, action): ZoneState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ZONES):
    case REQUEST(ACTION_TYPES.FETCH_ZONE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ZONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ZONE):
    case REQUEST(ACTION_TYPES.UPDATE_ZONE):
    case REQUEST(ACTION_TYPES.DELETE_ZONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ZONES):
    case FAILURE(ACTION_TYPES.FETCH_ZONE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ZONE):
    case FAILURE(ACTION_TYPES.CREATE_ZONE):
    case FAILURE(ACTION_TYPES.UPDATE_ZONE):
    case FAILURE(ACTION_TYPES.DELETE_ZONE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ZONES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ZONE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ZONE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ZONE):
    case SUCCESS(ACTION_TYPES.UPDATE_ZONE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ZONE):
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

const apiUrl = SERVER_API_URL + '/api/zones';
const apiSearchUrl = SERVER_API_URL + '/api/_search/zones';

// Actions

export const getSearchEntities: ICrudSearchAction<IZone> = query => ({
  type: ACTION_TYPES.SEARCH_ZONES,
  payload: axios.get<IZone>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IZone> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ZONE_LIST,
  payload: axios.get<IZone>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IZone> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ZONE,
    payload: axios.get<IZone>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IZone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ZONE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IZone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ZONE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IZone> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ZONE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
