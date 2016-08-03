import { button } from '@cycle/dom';

function view(state$) {
  return state$
      .map(state => button('.toggle-btn', {
        props: {
          disabled: state.disabled,
        },
      }, 'Toggle all'));
}

export default view;
