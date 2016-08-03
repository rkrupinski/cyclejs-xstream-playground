import xs from 'xstream';

import model from './model';
import view from './view';
import toggleAllBtn from '../toggleAllBtn';

function ammendState(DOM) {
  return function mapFn(state) {
    const { list } = state;

    return {
      ...state,
      toggleBtn: toggleAllBtn({
        DOM,
        props$: xs.of({
          disabled: !list.length,
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
      .map(({ toggleBtn }) => xs.merge(
        toggleBtn.action$
      ))
      .flatten();

  const vtree$ = view(ammendedState$);

  return {
    DOM: vtree$,
    action$,
  };
}

export default todoListToolbar;
