import concat from 'xstream/extra/concat';

import constants from '../constants';

function intent(actions$, initialHash, hashChange) {
  return {
    routeChange$: concat(
      initialHash.map(hash => hash.slice(1)),
      hashChange.map(e => e.newURL.split('#').pop())
    )
        .map(route => {
          const [, filter] = /\/?([^#]*)$/.exec(route);

          return {
            type: constants.ROUTE_CHANGE,
            payload: { filter },
          };
        }),
    addTodo$: actions$
        .filter(({ type, payload: { body } = {} }) =>
            type === constants.FORM_SUBMIT && !!body)
        .map(action => ({
          ...action,
          type: constants.TODO_ADD,
        })),
    toggleTodo$: actions$
        .filter(({ type }) => type === constants.TODO_TOGGLE),
    deleteTodo$: actions$
        .filter(({ type }) => type === constants.TODO_DELETE),
    updateTodo$: actions$
        .filter(({ type, payload: { body } = {} }) =>
            type === constants.TODO_DONE_EDITING && !!body),
    toggleAll$: actions$
        .filter(({ type }) => type === constants.TODO_TOGGLE_ALL),
  };
}

export default intent;
