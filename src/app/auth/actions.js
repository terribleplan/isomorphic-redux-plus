import { createRequest } from 'lib/promiseMiddleware';
import { LOAD_AUTH, LOGIN, LOGOUT } from './types';

export const loadAuth = () => createRequest.get(LOAD_AUTH, '/loadAuth');
export const logout = () => createRequest.post(LOGOUT, '/logout');
export const login = (payload) => createRequest.post(LOGIN, '/login', payload);
