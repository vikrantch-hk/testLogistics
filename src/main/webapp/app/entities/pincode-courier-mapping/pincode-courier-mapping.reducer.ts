import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IPincodeCourierMapping } from 'app/shared/model/pincode-courier-mapping.model';

export const ACTION_TYPES = {
  FETCH_PINCODECOURIERMAPPING_LIST: 'pincodeCourierMapping/FETCH_PINCODECOURIERMAPPING_LIST',
  FETCH_PINCODECOURIERMAPPING: 'pincodeCourierMapping/FETCH_PINCODECOURIERMAPPING',
  CREATE_PINCODECOURIERMAPPING: 'pincodeCourierMapping/CREATE_PINCODECOURIERMAPPING',
  UPDATE_PINCODECOURIERMAPPING: 'pincodeCourierMapping/UPDATE_PINCODECOURIERMAPPING',
  DELETE_PINCODECOURIERMAPPING: 'pincodeCourierMapping/DELETE_PINCODECOURIERMAPPING',
  RESET: 'pincodeCourierMapping/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_PINCODECOURIERMAPPING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PINCODECOURIERMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PINCODECOURIERMAPPING):
    case REQUEST(ACTION_TYPES.UPDATE_PINCODECOURIERMAPPING):
    case REQUEST(ACTION_TYPES.DELETE_PINCODECOURIERMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PINCODECOURIERMAPPING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PINCODECOURIERMAPPING):
    case FAILURE(ACTION_TYPES.CREATE_PINCODECOURIERMAPPING):
    case FAILURE(ACTION_TYPES.UPDATE_PINCODECOURIERMAPPING):
    case FAILURE(ACTION_TYPES.DELETE_PINCODECOURIERMAPPING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PINCODECOURIERMAPPING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PINCODECOURIERMAPPING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PINCODECOURIERMAPPING):
    case SUCCESS(ACTION_TYPES.UPDATE_PINCODECOURIERMAPPING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PINCODECOURIERMAPPING):
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

const apiUrl = SERVER_API_URL + '/api/pincode-courier-mappings';

// Actions

export const getEntities: ICrudGetAllAction<IPincodeCourierMapping> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PINCODECOURIERMAPPING_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<IPincodeCourierMapping>
});

export const getEntity: ICrudGetAction<IPincodeCourierMapping> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PINCODECOURIERMAPPING,
    payload: axios.get(requestUrl) as Promise<IPincodeCourierMapping>
  };
};

export const createEntity: ICrudPutAction<IPincodeCourierMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PINCODECOURIERMAPPING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPincodeCourierMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PINCODECOURIERMAPPING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPincodeCourierMapping> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PINCODECOURIERMAPPING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
