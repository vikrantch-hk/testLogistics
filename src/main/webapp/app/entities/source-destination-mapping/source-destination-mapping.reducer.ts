import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ISourceDestinationMapping } from 'app/shared/model/source-destination-mapping.model';

export const ACTION_TYPES = {
  FETCH_SOURCEDESTINATIONMAPPING_LIST: 'sourceDestinationMapping/FETCH_SOURCEDESTINATIONMAPPING_LIST',
  FETCH_SOURCEDESTINATIONMAPPING: 'sourceDestinationMapping/FETCH_SOURCEDESTINATIONMAPPING',
  CREATE_SOURCEDESTINATIONMAPPING: 'sourceDestinationMapping/CREATE_SOURCEDESTINATIONMAPPING',
  UPDATE_SOURCEDESTINATIONMAPPING: 'sourceDestinationMapping/UPDATE_SOURCEDESTINATIONMAPPING',
  DELETE_SOURCEDESTINATIONMAPPING: 'sourceDestinationMapping/DELETE_SOURCEDESTINATIONMAPPING',
  RESET: 'sourceDestinationMapping/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SOURCEDESTINATIONMAPPING):
    case REQUEST(ACTION_TYPES.UPDATE_SOURCEDESTINATIONMAPPING):
    case REQUEST(ACTION_TYPES.DELETE_SOURCEDESTINATIONMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING):
    case FAILURE(ACTION_TYPES.CREATE_SOURCEDESTINATIONMAPPING):
    case FAILURE(ACTION_TYPES.UPDATE_SOURCEDESTINATIONMAPPING):
    case FAILURE(ACTION_TYPES.DELETE_SOURCEDESTINATIONMAPPING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SOURCEDESTINATIONMAPPING):
    case SUCCESS(ACTION_TYPES.UPDATE_SOURCEDESTINATIONMAPPING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SOURCEDESTINATIONMAPPING):
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

const apiUrl = SERVER_API_URL + '/api/source-destination-mappings';

// Actions

export const getEntities: ICrudGetAllAction<ISourceDestinationMapping> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`) as Promise<ISourceDestinationMapping>
});

export const getEntity: ICrudGetAction<ISourceDestinationMapping> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SOURCEDESTINATIONMAPPING,
    payload: axios.get(requestUrl) as Promise<ISourceDestinationMapping>
  };
};

export const createEntity: ICrudPutAction<ISourceDestinationMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SOURCEDESTINATIONMAPPING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISourceDestinationMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SOURCEDESTINATIONMAPPING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISourceDestinationMapping> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SOURCEDESTINATIONMAPPING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
