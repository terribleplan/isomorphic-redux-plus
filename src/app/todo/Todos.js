import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { prefetch } from '@isogon/prefetch';
import { createStructuredSelector as select } from 'reselect';

import TodosForm from './TodosForm';
import TodosView from './TodosView';
import * as todoActions from './actions';
import { todosByDate, isEditable } from './selectors';

const wrap = compose(
  prefetch(() => todoActions.loadTodos()),

  connect(select({
    todos: todosByDate,
    editable: isEditable,
  }), todoActions)
);

export class Todos extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    todos: [],
    editable: false,
  };

  render() {
    const { createTodo, deleteTodo, editable, editTodo, todos } = this.props;

    return (
      <div>
        {editable && <TodosForm createTodo={createTodo} />}
        <TodosView
          todos={todos}
          editable={editable}
          handleDelete={deleteTodo}
          handleEdit={editTodo}
        />
      </div>
    );
  }
}

export default wrap(Todos);
