import xs from 'xstream';
import delay from 'xstream/extra/delay';

import constants from '../constants';

function model(action$) {
  return xs.merge(
    action$
        .filter(({ type }) => type === constants.FORM_INPUT)
        .map(({ payload: { value } }) => value),
    action$
        .filter(({ type }) => type === constants.FORM_SUBMIT)
        .compose(delay(0))
        .mapTo('')
  )
      .startWith('');
}

export default model;
