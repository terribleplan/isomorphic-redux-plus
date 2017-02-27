import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import inject from '@isogon/inject';


export default function initMiddlewares(injections) {
  const middleware = [
    applyMiddleware(
      inject(injections),
      promiseMiddleware,
    ),
  ];

  if (typeof window !== 'undefined' && window.devToolsExtension) {
    middleware.push(window.devToolsExtension());
  }

  return middleware;
}
