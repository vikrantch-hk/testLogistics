import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICourierPricingEngine, defaultValue } from 'app/shared/model/courier-pricing-engine.model';

export const ACTION_TYPES = {
  SEARCH_COURIERPRICINGENGINES: 'courierPricingEngine/SEARCH_COURIERPRICINGENGINES',
  FETCH_COURIERPRICINGENGINE_LIST: 'courierPricingEngine/FETCH_COURIERPRICINGENGINE_LIST',
  FETCH_COURIERPRICINGENGINE: 'courierPricingEngine/FETCH_COURIERPRICINGENGINE',
  CREATE_COURIERPRICINGENGINE: 'courierPricingEngine/CREATE_COURIERPRICINGENGINE',
  UPDATE_COURIERPRICINGENGINE: 'courierPricingEngine/UPDATE_COURIERPRICINGENGINE',
  DELETE_COURIERPRICINGENGINE: 'courierPricingEngine/DELETE_COURIERPRICINGENGINE',
  RESET: 'courierPricingEngine/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICourierPricingEngine>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CourierPricingEngineState = Readonly<typeof initialState>;

// Reducer

export default (state: CourierPricingEngineState = initialState, action): CourierPricingEngineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COURIERPRICINGENGINES):
    case REQUEST(ACTION_TYPES.FETCH_COURIERPRICINGENGINE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURIERPRICINGENGINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURIERPRICINGENGINE):
    case REQUEST(ACTION_TYPES.UPDATE_COURIERPRICINGENGINE):
    case REQUEST(ACTION_TYPES.DELETE_COURIERPRICINGENGINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COURIERPRICINGENGINES):
    case FAILURE(ACTION_TYPES.FETCH_COURIERPRICINGENGINE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURIERPRICINGENGINE):
    case FAILURE(ACTION_TYPES.CREATE_COURIERPRICINGENGINE):
    case FAILURE(ACTION_TYPES.UPDATE_COURIERPRICINGENGINE):
    case FAILURE(ACTION_TYPES.DELETE_COURIERPRICINGENGINE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COURIERPRICINGENGINES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERPRICINGENGINE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURIERPRICINGENGINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURIERPRICINGENGINE):
    case SUCCESS(ACTION_TYPES.UPDATE_COURIERPRICINGENGINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURIERPRICINGENGINE):
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

const apiUrl = SERVER_API_URL + '/api/courier-pricing-engines';
const apiSearchUrl = SERVER_API_URL + '/api/_search/courier-pricing-engines';

// Actions

export const getSearchEntities: ICrudSearchAction<ICourierPricingEngine> = query => ({
  type: ACTION_TYPES.SEARCH_COURIERPRICINGENGINES,
  payload: axios.get<ICourierPricingEngine>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICourierPricingEngine> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COURIERPRICINGENGINE_LIST,
  payload: axios.get<ICourierPricingEngine>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICourierPricingEngine> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURIERPRICINGENGINE,
    payload: axios.get<ICourierPricingEngine>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICourierPricingEngine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURIERPRICINGENGINE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICourierPricingEngine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURIERPRICINGENGINE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourierPricingEngine> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURIERPRICINGENGINE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
