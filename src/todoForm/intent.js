import xs from 'xstream';

import constants from '../constants';

function intent(DOM) {
  return xs.merge(
    DOM
        .select('.todo-input')
        .events('input')
        .map(e => ({
          type: constants.FORM_INPUT,
          body: e.target.value,
        })),
    DOM
        .select('.todo-form')
        .events('submit')
        .debug(e => e.preventDefault())
        .mapTo({
          type: constants.FORM_SUBMIT,
        })
  );
}

export default intent;
