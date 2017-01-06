import { injected } from 'lib/promiseMiddleware';
import {
  LOAD_ABOUT,
  TOGGLE_KITTEN,
} from './types';

export const loadAbout = () => injected(
  LOAD_ABOUT,
  ({ client }) => client.get('/about'),
  { role: 'primary' },
);


export const toggleKitten = () => ({
  type: TOGGLE_KITTEN,
});
