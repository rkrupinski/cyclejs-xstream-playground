import xs from 'xstream';

import isolate from '@cycle/isolate';

import intent from './intent';
import model from './model';
import view from './view';

function todoItem({ DOM, props$ }) {
  const action$ = intent(DOM);
  const state$ = model(props$, action$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    action$: xs.empty(),
  };
}

export default sources => isolate(todoItem)(sources);
