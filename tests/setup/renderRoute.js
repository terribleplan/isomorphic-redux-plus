import React from 'react';
import axios from 'axios';

import { match } from 'react-router';
import { Provider } from 'react-redux';
import { Prefetcher, prefetchData } from '@isogon/prefetch';
import MockAdapter from 'axios-mock-adapter';
import { mount } from 'enzyme';


import configureStore from 'helpers/store';
import handleResponses from 'helpers/api/handleResponses';
import getRoutes from 'routes';


global.renderRoute = function renderRoute(route, applyMockClient) {
  const client = handleResponses(axios.create());
  const mock = new MockAdapter(client);

  applyMockClient && applyMockClient(mock);

  const store = configureStore({ client }, { auth: { loaded: true } });

  const routes = getRoutes(store);

  return new Promise((resolve, reject) => {
    ((function matchByUrl(url) {
      match({ routes, location: url }, (err, redirectLocation, renderProps) => {
        if (err) {
          return reject(err);
        }

        if (redirectLocation) {
          return matchByUrl(redirectLocation.pathname + redirectLocation.search);
        }

        if (!renderProps) {
          return reject(new Error('not found'));
        }

        return prefetchData({ ...renderProps, store })
          .then(() => resolve(mount(
            <Provider store={store} key="provider">
              <Prefetcher {...renderProps} prefetchedOnServer />
            </Provider>
          )));
      });
    })(route));
  });
};
