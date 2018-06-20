import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IAwbStatus, defaultValue } from 'app/shared/model/awb-status.model';

export const ACTION_TYPES = {
  SEARCH_AWBSTATUSES: 'awbStatus/SEARCH_AWBSTATUSES',
  FETCH_AWBSTATUS_LIST: 'awbStatus/FETCH_AWBSTATUS_LIST',
  FETCH_AWBSTATUS: 'awbStatus/FETCH_AWBSTATUS',
  CREATE_AWBSTATUS: 'awbStatus/CREATE_AWBSTATUS',
  UPDATE_AWBSTATUS: 'awbStatus/UPDATE_AWBSTATUS',
  DELETE_AWBSTATUS: 'awbStatus/DELETE_AWBSTATUS',
  RESET: 'awbStatus/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAwbStatus>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AwbStatusState = Readonly<typeof initialState>;

// Reducer

export default (state: AwbStatusState = initialState, action): AwbStatusState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_AWBSTATUSES):
    case REQUEST(ACTION_TYPES.FETCH_AWBSTATUS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AWBSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AWBSTATUS):
    case REQUEST(ACTION_TYPES.UPDATE_AWBSTATUS):
    case REQUEST(ACTION_TYPES.DELETE_AWBSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_AWBSTATUSES):
    case FAILURE(ACTION_TYPES.FETCH_AWBSTATUS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AWBSTATUS):
    case FAILURE(ACTION_TYPES.CREATE_AWBSTATUS):
    case FAILURE(ACTION_TYPES.UPDATE_AWBSTATUS):
    case FAILURE(ACTION_TYPES.DELETE_AWBSTATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_AWBSTATUSES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AWBSTATUS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AWBSTATUS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AWBSTATUS):
    case SUCCESS(ACTION_TYPES.UPDATE_AWBSTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AWBSTATUS):
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

const apiUrl = SERVER_API_URL + '/api/awb-statuses';
const apiSearchUrl = SERVER_API_URL + '/api/_search/awb-statuses';

// Actions

export const getSearchEntities: ICrudSearchAction<IAwbStatus> = query => ({
  type: ACTION_TYPES.SEARCH_AWBSTATUSES,
  payload: axios.get<IAwbStatus>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IAwbStatus> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AWBSTATUS_LIST,
  payload: axios.get<IAwbStatus>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAwbStatus> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AWBSTATUS,
    payload: axios.get<IAwbStatus>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAwbStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AWBSTATUS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAwbStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AWBSTATUS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAwbStatus> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AWBSTATUS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
