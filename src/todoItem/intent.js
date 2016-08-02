import xs from 'xstream';

import constants from '../constants';

function intent(DOM) {
  return xs.merge(
    DOM
        .select('.todo-toggle')
        .events('change')
        .mapTo({
          type: constants.TODO_TOGGLE,
        }),
    DOM
        .select('.todo-delete')
        .events('click')
        .mapTo({
          type: constants.TODO_DELETE,
        }),
    DOM
        .select('.todo-body')
        .events('click')
        .mapTo({
          type: constants.TODO_START_EDITING,
        }),
    DOM
        .select('.todo-input')
        .events('keyup')
        .filter(e => e.keyCode === constants.ENTER_KEY)
        .map(e => ({
          type: constants.TODO_DONE_EDITING,
          payload: {
            body: e.target.value.trim(),
          },
        })),
    DOM
        .select('.todo-input')
        .events('keyup')
        .filter(e => e.keyCode === constants.ESCAPE_KEY)
        .mapTo({
          type: constants.TODO_CANCEL_EDITING,
        }),
    DOM
        .select('.todo-input')
        .events('blur')
        .mapTo({
          type: constants.TODO_CANCEL_EDITING,
        })
  );
}

export default intent;
