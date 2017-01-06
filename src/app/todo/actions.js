import {
  LOAD_TODOS,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from './types';
import {
  getTodo,
} from './selectors';
import { injected } from 'lib/promiseMiddleware';

export const loadTodos = () => injected(
  LOAD_TODOS,
  ({ client }) => client.get('/todos'),
  { role: 'primary' }
);

export const createTodo = (text) => injected(
  CREATE_TODO,
  ({ client }) => client.post('/todos', { text, dateCreated: Date.now() }),
);

export const editTodo = (id, text) => (dispatch, getState) => {
  const todo = getTodo(id)(getState());
  dispatch(injected(
    EDIT_TODO,
    ({ client }) => client.put(`/todos/${id}`, { ...todo, id, text }),
  ));
};

export const deleteTodo = (id) => injected(
  DELETE_TODO,
  ({ client }) => client.delete(`/todos/${id}`),
  { id },
);
