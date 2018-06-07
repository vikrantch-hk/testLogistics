import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICityCourierTAT } from 'app/shared/model/city-courier-tat.model';

export const ACTION_TYPES = {
  FETCH_CITYCOURIERTAT_LIST: 'cityCourierTAT/FETCH_CITYCOURIERTAT_LIST',
  FETCH_CITYCOURIERTAT: 'cityCourierTAT/FETCH_CITYCOURIERTAT',
  CREATE_CITYCOURIERTAT: 'cityCourierTAT/CREATE_CITYCOURIERTAT',
  UPDATE_CITYCOURIERTAT: 'cityCourierTAT/UPDATE_CITYCOURIERTAT',
  DELETE_CITYCOURIERTAT: 'cityCourierTAT/DELETE_CITYCOURIERTAT',
  RESET: 'cityCourierTAT/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_CITYCOURIERTAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CITYCOURIERTAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CITYCOURIERTAT):
    case REQUEST(ACTION_TYPES.UPDATE_CITYCOURIERTAT):
    case REQUEST(ACTION_TYPES.DELETE_CITYCOURIERTAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CITYCOURIERTAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CITYCOURIERTAT):
    case FAILURE(ACTION_TYPES.CREATE_CITYCOURIERTAT):
    case FAILURE(ACTION_TYPES.UPDATE_CITYCOURIERTAT):
    case FAILURE(ACTION_TYPES.DELETE_CITYCOURIERTAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CITYCOURIERTAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CITYCOURIERTAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CITYCOURIERTAT):
    case SUCCESS(ACTION_TYPES.UPDATE_CITYCOURIERTAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CITYCOURIERTAT):
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

const apiUrl = SERVER_API_URL + '/api/city-courier-tats';

// Actions

export const getEntities: ICrudGetAllAction<ICityCourierTAT> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CITYCOURIERTAT_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<ICityCourierTAT>
});

export const getEntity: ICrudGetAction<ICityCourierTAT> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CITYCOURIERTAT,
    payload: axios.get(requestUrl) as Promise<ICityCourierTAT>
  };
};

export const createEntity: ICrudPutAction<ICityCourierTAT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CITYCOURIERTAT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICityCourierTAT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CITYCOURIERTAT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICityCourierTAT> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CITYCOURIERTAT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
