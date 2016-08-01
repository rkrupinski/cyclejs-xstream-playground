import xs from 'xstream';

import constants from '../constants';

function intent(DOM) {
  return xs.merge(
    DOM
        .select('.todo-input')
        .events('input')
        .map(e => ({
          type: constants.FORM_INPUT,
          payload: {
            value: e.target.value,
          },
        })),
    DOM
        .select('.todo-form')
        .events('submit')
        .debug(e => e.preventDefault())
        .map(e => ({
          type: constants.FORM_SUBMIT,
          payload: {
            body: e.target.todo.value.trim(),
          },
        }))
  );
}

export default intent;
