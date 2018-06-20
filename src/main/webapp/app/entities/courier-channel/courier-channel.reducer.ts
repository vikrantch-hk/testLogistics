import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICourierChannel, defaultValue } from 'app/shared/model/courier-channel.model';

export const ACTION_TYPES = {
  SEARCH_COURIERCHANNELS: 'courierChannel/SEARCH_COURIERCHANNELS',
  FETCH_COURIERCHANNEL_LIST: 'courierChannel/FETCH_COURIERCHANNEL_LIST',
  FETCH_COURIERCHANNEL: 'courierChannel/FETCH_COURIERCHANNEL',
  CREATE_COURIERCHANNEL: 'courierChannel/CREATE_COURIERCHANNEL',
  UPDATE_COURIERCHANNEL: 'courierChannel/UPDATE_COURIERCHANNEL',
  DELETE_COURIERCHANNEL: 'courierChannel/DELETE_COURIERCHANNEL',
  RESET: 'courierChannel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICourierChannel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CourierChannelState = Readonly<typeof initialState>;

// Reducer

export default (state: CourierChannelState = initialState, action): CourierChannelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COURIERCHANNELS):
    case REQUEST(ACTION_TYPES.FETCH_COURIERCHANNEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURIERCHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURIERCHANNEL):
    case REQUEST(ACTION_TYPES.UPDATE_COURIERCHANNEL):
    case REQUEST(ACTION_TYPES.DELETE_COURIERCHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COURIERCHANNELS):
    case FAILURE(ACTION_TYPES.FETCH_COURIERCHANNEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURIERCHANNEL):
    case FAILURE(ACTION_TYPES.CREATE_COURIERCHANNEL):
    case FAILURE(ACTION_TYPES.UPDATE_COURIERCHANNEL):
    case FAILURE(ACTION_TYPES.DELETE_COURIERCHANNEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COURIERCHANNELS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERCHANNEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERCHANNEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURIERCHANNEL):
    case SUCCESS(ACTION_TYPES.UPDATE_COURIERCHANNEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURIERCHANNEL):
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

const apiUrl = SERVER_API_URL + '/api/courier-channels';
const apiSearchUrl = SERVER_API_URL + '/api/_search/courier-channels';

// Actions

export const getSearchEntities: ICrudSearchAction<ICourierChannel> = query => ({
  type: ACTION_TYPES.SEARCH_COURIERCHANNELS,
  payload: axios.get<ICourierChannel>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICourierChannel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COURIERCHANNEL_LIST,
  payload: axios.get<ICourierChannel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICourierChannel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURIERCHANNEL,
    payload: axios.get<ICourierChannel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICourierChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURIERCHANNEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICourierChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURIERCHANNEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourierChannel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURIERCHANNEL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
