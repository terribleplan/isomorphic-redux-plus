import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import about from 'about/reducer';
import auth from 'auth/reducer';
import todo from 'todo/reducer';
import pageStatus from 'status/reducer';

const routingState = fromJS({ locationBeforeTransitions: null });
const routing = (state = routingState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }
  return state;
};

export default combineReducers({ routing, about, auth, todo, pageStatus });
