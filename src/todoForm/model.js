import xs from 'xstream';

import constants from '../constants';

function model(action$) {
  return xs.merge(
    action$
        .filter(({ type }) => type === constants.FORM_INPUT)
        .map(({ body }) => body),
    action$
        .filter(({ type }) => type === constants.FORM_SUBMIT)
        .mapTo('')
  )
      .startWith('');
}

export default model;
