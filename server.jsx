import express                     from 'express';
import bodyParser                  from 'body-parser';
import session                     from 'express-session';
import axios                       from 'axios';
import React                       from 'react';
import { renderToString }          from 'react-dom/server'
import { RoutingContext, match }   from 'react-router';
import injectStoreAndGetRoutes     from 'routes';
import { Provider }                from 'react-redux';
import * as reducers               from 'reducers';
import {
  createStore,
  combineReducers,
  applyMiddleware
}                                  from 'redux';
import path                        from 'path';
import favicon                     from 'serve-favicon';

import fetchComponentData          from 'lib/fetchComponentData';
import injectAxiosAndGetMiddleware from 'lib/promiseMiddleware';
import apiRouter                   from './api';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev')(app);
}

app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
  secret:            'duck quack',
  resave:            false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/api/1', apiRouter);

app.use((req, res) => {
  axios.interceptors.request.use(function (config) {
    if (config.url[0] === '/') {
      config.url = 'http://localhost:3000/api/1' + config.url;
      config.headers = req.headers;
    }
    return config;
  });

  const reducer = combineReducers(reducers);
  const promiseMiddleware = injectAxiosAndGetMiddleware(axios);

  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);
  const routes = injectStoreAndGetRoutes(store);

  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps)
      return res.status(404).end('Not found');

    const status = renderProps.routes.reduce((prev, curr) => curr.status || prev, 200);

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link rel="shortcut icon" href="/favicon.ico">

          <title>Redux Demo</title>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.status(status).end(html))
      .catch(err => {
        console.log(err.stack);
        res.sendStatus(500);
      });
  });
});

export default app;
