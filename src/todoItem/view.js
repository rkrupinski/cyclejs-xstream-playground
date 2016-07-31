import { li } from '@cycle/dom';

function view(state$) {
  return state$
      .map(state => li([state.body]));
}

export default view;
