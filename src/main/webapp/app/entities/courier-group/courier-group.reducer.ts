import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICourierGroup, defaultValue } from 'app/shared/model/courier-group.model';

export const ACTION_TYPES = {
  SEARCH_COURIERGROUPS: 'courierGroup/SEARCH_COURIERGROUPS',
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
  entities: [] as ReadonlyArray<ICourierGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CourierGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: CourierGroupState = initialState, action): CourierGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COURIERGROUPS):
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
    case FAILURE(ACTION_TYPES.SEARCH_COURIERGROUPS):
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
    case SUCCESS(ACTION_TYPES.SEARCH_COURIERGROUPS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
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
const apiSearchUrl = SERVER_API_URL + '/api/_search/courier-groups';

// Actions

export const getSearchEntities: ICrudSearchAction<ICourierGroup> = query => ({
  type: ACTION_TYPES.SEARCH_COURIERGROUPS,
  payload: axios.get<ICourierGroup>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICourierGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COURIERGROUP_LIST,
  payload: axios.get<ICourierGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICourierGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURIERGROUP,
    payload: axios.get<ICourierGroup>(requestUrl)
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
