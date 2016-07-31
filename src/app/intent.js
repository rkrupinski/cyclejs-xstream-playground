import concat from 'xstream/extra/concat';

import constants from '../constants';

function intent(actions$, initialHash, hashChange) {
  return {
    routeChange$: concat(
      initialHash.map(hash => hash.slice(1)),
      hashChange.map(e => e.newURL.split('#').pop())
    )
        .map(route => {
          const [, payload] = /\/?([^#]*)$/.exec(route);

          return {
            type: constants.ROUTE_CHANGE,
            payload,
          };
        }),

    addTodo$: actions$
        .filter(({ type, payload }) =>
            type === constants.FORM_SUBMIT && !!payload)
        .map(action => ({
          ...action,
          type: constants.ADD_TODO,
        })),
  };
}

export default intent;
