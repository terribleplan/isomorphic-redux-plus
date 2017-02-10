import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import promiseMiddleware from 'redux-promise';
import { fromJS } from 'immutable';
import inject from '@isogon/inject';

import reducer from 'reducer';

export default function configureStore(injections, preloadedState = {}) {
  const middleware = [
    applyMiddleware(
      inject(injections),
      promiseMiddleware,
    ),
  ];

  if (typeof window !== 'undefined' && window.devToolsExtension) {
    middleware.push(window.devToolsExtension());
  }

  const finalCreateStore = compose(...middleware)(createStore);

  const store = finalCreateStore(reducer, fromJS(preloadedState));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducer', () => {
      const nextReducer = require('reducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
