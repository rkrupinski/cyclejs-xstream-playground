import xs from 'xstream';

import model from './model';
import view from './view';
import todoItem from '../todoItem';

function ammendState(DOM) {
  return function mapFn(state) {
    return {
      ...state,
      list: state.list.map(data => ({
        ...data,
        todoItem: todoItem({
          DOM,
          props$: xs.of(data),
        }),
      })),
    };
  };
}

function todoList({ DOM, props$ }) {
  const state$ = model(props$);

  const ammendedState$ = state$
      .map(ammendState(DOM));

  const action$ = ammendedState$
      .map(state => xs.merge(
          ...state.list.map(data => data.todoItem.action$)))
      .flatten();

  const vtree$ = view(ammendedState$);

  return {
    DOM: vtree$,
    action$,
  };
}

export default todoList;
