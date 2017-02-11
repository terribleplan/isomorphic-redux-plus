import { createAction } from 'redux-actions';
import { setStatus } from 'status/actions';

import {
  LOAD_ABOUT,
  TOGGLE_KITTEN,
} from './types';


export const loadAboutAction = createAction(LOAD_ABOUT);
export const toggleKitten = createAction(TOGGLE_KITTEN);

export const loadAbout = () => ({ client, store }) => loadAboutAction(
  client.get('/about').catch((err) => {
    store.dispatch(setStatus(err.response.status));
  }),
);
