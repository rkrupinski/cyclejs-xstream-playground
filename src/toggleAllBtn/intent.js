import constants from '../constants';

function intent(DOM) {
  return DOM
      .select('.toggle-btn')
      .events('click')
      .mapTo({
        type: constants.TODO_TOGGLE_ALL,
      });
}

export default intent;
