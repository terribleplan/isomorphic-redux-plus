import { LOCATION_CHANGE } from 'react-router-redux';
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  SET_STATUS,
  LOAD_ERROR,
} from './types';

const defaultState = Map({ status: null, initialLoad: true });

const computeStatus = (status) => {
  if (!status) {
    return 0;
  }

  return String(status).startsWith('5') ? 503 : 404;
};

export default handleActions({
  [SET_STATUS]: (state, { payload }) =>
    state.set('status', computeStatus(payload)),

  [LOCATION_CHANGE]: (state) => (
    state.get('initialLoad')
      ? state.set('initialLoad', false)
      : state.set('status', null)),

  [LOAD_ERROR]: (state, { payload }) =>
    state.set('status', computeStatus(payload.response.status)),
}, defaultState);
