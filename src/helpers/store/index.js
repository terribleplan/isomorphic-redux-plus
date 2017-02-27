import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';

import reducer from 'reducer';
import initMiddlewares from './middlewares';

export default function configureStore(injections, preloadedState = {}) {
  const middleware = initMiddlewares(injections);
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
