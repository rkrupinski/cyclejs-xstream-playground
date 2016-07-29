import xs from 'xstream';

import { p } from '@cycle/dom';

function view() {
  return xs.of(p('💩'));
}

export default view;
