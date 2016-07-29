import xs from 'xstream';

import { div } from '@cycle/dom';

function view() {
  return xs.of(div('foo'));
}

export default view;
