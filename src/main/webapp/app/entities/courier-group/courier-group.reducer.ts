import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICourierGroup } from 'app/shared/model/courier-group.model';

export const ACTION_TYPES = {
  FETCH_COURIERGROUP_LIST: 'courierGroup/FETCH_COURIERGROUP_LIST',
  FETCH_COURIERGROUP: 'courierGroup/FETCH_COURIERGROUP',
  CREATE_COURIERGROUP: 'courierGroup/CREATE_COURIERGROUP',
  UPDATE_COURIERGROUP: 'courierGroup/UPDATE_COURIERGROUP',
  DELETE_COURIERGROUP: 'courierGroup/DELETE_COURIERGROUP',
  RESET: 'courierGroup/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_COURIERGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURIERGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURIERGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_COURIERGROUP):
    case REQUEST(ACTION_TYPES.DELETE_COURIERGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COURIERGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURIERGROUP):
    case FAILURE(ACTION_TYPES.CREATE_COURIERGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_COURIERGROUP):
    case FAILURE(ACTION_TYPES.DELETE_COURIERGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURIERGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_COURIERGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURIERGROUP):
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

const apiUrl = SERVER_API_URL + '/api/courier-groups';

// Actions

export const getEntities: ICrudGetAllAction<ICourierGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COURIERGROUP_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<ICourierGroup>
});

export const getEntity: ICrudGetAction<ICourierGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURIERGROUP,
    payload: axios.get(requestUrl) as Promise<ICourierGroup>
  };
};

export const createEntity: ICrudPutAction<ICourierGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURIERGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICourierGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURIERGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourierGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURIERGROUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
