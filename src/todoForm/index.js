import xs from 'xstream';

import view from './view';

function todoForm() {
  const vtree$ = view();

  return {
    DOM: vtree$,
    action$: xs.empty(),
  };
}

export default todoForm;
