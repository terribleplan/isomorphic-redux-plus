import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Prefetcher } from '@isogon/prefetch';

import injectStoreAndGetRoutes from 'routes';
import createApiClient from '../helpers/api';
import configureStore from '../helpers/store';
import config from '../config';

const client = createApiClient(config.apiBaseUrl);
const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

const store = configureStore({ client }, preloadedState);
const renderRouter = (props) => (<Prefetcher {...props} prefetchedOnServer />);
const routes = injectStoreAndGetRoutes(store);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get('routing').toObject(),
});

const reactView = document.getElementById('react-view');
const reactApp = (
  <Provider store={store}>
    <Router render={renderRouter} history={history} children={routes} />
  </Provider>
);

render(reactApp, reactView);
