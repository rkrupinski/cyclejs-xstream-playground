import xs from 'xstream';

import model from './model';
import view from './view';
import toggleAllBtn from '../toggleAllBtn';
import clearCompletedBtn from '../clearCompletedBtn';
import itemsLeft from '../itemsLeft';

function ammendState(DOM) {
  return function mapFn(state) {
    const { list } = state;

    const completedCount = list
        .filter(({ completed }) => completed)
        .length;

    return {
      ...state,
      toggleBtn: toggleAllBtn({
        DOM,
        props$: xs.of({
          disabled: !list.length,
        }),
      }),
      clearBtn: clearCompletedBtn({
        DOM,
        props$: xs.of({
          disabled: !completedCount,
        }),
      }),
      itemsLeft: itemsLeft({
        props$: xs.of({
          pending: list.length - completedCount,
        }),
      }),
    };
  };
}

function todoListToolbar({ DOM, props$ }) {
  const state$ = model(props$);

  const ammendedState$ = state$
      .map(ammendState(DOM))
      .remember();

  const action$ = ammendedState$
      .map(({ toggleBtn, clearBtn }) => xs.merge(
        toggleBtn.action$,
        clearBtn.action$
      ))
      .flatten();

  const vtree$ = view(ammendedState$);

  return {
    DOM: vtree$,
    action$,
  };
}

export default todoListToolbar;
