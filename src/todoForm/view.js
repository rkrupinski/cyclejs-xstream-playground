import xs from 'xstream';

import { form } from '@cycle/dom';

function view() {
  return xs.of(form(['form']));
}

export default view;
