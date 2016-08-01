import xs from 'xstream';

import intent from './intent';
import model from './model';
import view from './view';

function todoItem({ DOM, props$ }) {
  const action$ = intent(DOM);
  const state$ = model(props$, action$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    action$: xs.combine(
      action$,
      props$
    )
        .map(([action, { id }]) => ({
          ...action,
          payload: {
            ...action.payload,
            id,
          },
        })),
  };
}

export default todoItem;
