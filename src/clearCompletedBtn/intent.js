import constants from '../constants';

function intent(DOM) {
  return DOM
      .select('.clear-btn')
      .events('click')
      .map(() => ({ type: constants.TODO_CLEAR_COMPLETED }));
}

export default intent;
