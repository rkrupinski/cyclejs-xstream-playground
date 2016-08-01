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
        })
  );
}

export default intent;
